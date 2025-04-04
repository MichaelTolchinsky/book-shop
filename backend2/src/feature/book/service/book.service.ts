import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schema/book.schema';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>){}

  async createBook(createBookDto: CreateBookDto, userId: string): Promise<Book> {
    const newBook = new this.bookModel({ ...createBookDto, creator: userId });
    return newBook.save();
  }

  async getBooks(pageSize: number, currentPage: number): Promise<{ books: Book[]; count: number }> {
    const bookQuery = this.bookModel.find();
    if (pageSize && currentPage) {
      bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    const books = await bookQuery.exec();
    const count = await this.bookModel.countDocuments().exec();
    return { books, count };
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto, userId: string): Promise<Book> {
    const existingBook = await this.bookModel.findById(id).exec();
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    if (existingBook.creator.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to update this book');
    }
    Object.assign(existingBook, updateBookDto);
    return existingBook.save();
  }

  async deleteBook(id: string, userId: string): Promise<void> {
    const existingBook = await this.bookModel.findById(id).exec();
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    if (existingBook.creator.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this book');
    }
    await this.bookModel.deleteOne({ _id: id }).exec();
  }
}
