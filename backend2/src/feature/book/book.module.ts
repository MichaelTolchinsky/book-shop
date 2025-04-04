import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  controllers: [BookController],
  imports: [
    MongooseModule.forFeature([
        { name: Book.name, schema: BookSchema }    
    ])
  ],
  providers: [BookService],
})
export class BookModule {}
