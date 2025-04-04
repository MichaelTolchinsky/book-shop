import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;
}