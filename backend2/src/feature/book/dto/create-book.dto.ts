import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsUrl()
  imageURL: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
