import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from '../schema/cart.schema';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { RemoveFromCartDto } from '../dto/remove-from-cart.dto';
import { CartItem } from '../schema/cart-item.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).populate('items.bookId').exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const { bookId } = addToCartDto;
    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = new this.cartModel({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push(new CartItem({ bookId: new Types.ObjectId(bookId), quantity: 1, price: 0 }));
    }

    await cart.save();
    return cart;
  }

  async removeFromCart(userId: string, removeFromCartDto: RemoveFromCartDto): Promise<Cart> {
    const { bookId } = removeFromCartDto;
    const cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
    await cart.save();
    return cart;
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    await cart.save();
    return cart;
  }
}
