import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookService } from '../service/book.service';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query('pagesize') pageSize: number, @Query('page') currentPage: number) {
    const { books, count } = await this.bookService.getBooks(pageSize, currentPage);
    return {
      message: 'Books fetched successfully',
      books,
      maxBooks: count,
    };
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    const book = await this.bookService.getBookById(id);
    return book;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto, @Req() req) {
    const createdBook = await this.bookService.createBook(createBookDto, req.user.userId);
    return {
      message: 'Book added successfully',
      book: createdBook,
    };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Req() req) {
    const updatedBook = await this.bookService.updateBook(id, updateBookDto, req.user.userId);
    return {
      message: 'Updated successfully',
      book: updatedBook,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Req() req) {
    await this.bookService.deleteBook(id, req.user.userId);
    return {
      message: 'Book deleted successfully',
    };
  }
}
