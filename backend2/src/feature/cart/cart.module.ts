import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';

@Module({
  controllers: [CartController],
  imports:[
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema }    
    ]),
  ],
  providers: [CartService],
})
export class CartModule {}
