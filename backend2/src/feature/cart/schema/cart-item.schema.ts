import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Book } from 'src/feature/book/schema/book.schema';

@Schema({_id: false})
export class CartItem extends Document{
  @Prop({ type: Types.ObjectId, ref: Book.name, required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);