import { Controller, Get, Post, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Cart } from '../schema/cart.schema';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CartService } from '../service/cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { RemoveFromCartDto } from '../dto/remove-from-cart.dto';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req): Promise<Cart> {
    return this.cartService.getCart(req.user.userId);
  }

  @Post(':bookId')
  addToCart(@Req() req, @Param('bookId') addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartService.addToCart(req.user.userId, addToCartDto);
  }

  @Delete(':bookId')
  removeFromCart(@Req() req, @Param('bookId') removeFromCartDto: RemoveFromCartDto): Promise<Cart> {
    return this.cartService.removeFromCart(req.user.userId, removeFromCartDto);
  }

  @Delete()
  clearCart(@Req() req): Promise<Cart> {
    return this.cartService.clearCart(req.user.userId);
  }
}