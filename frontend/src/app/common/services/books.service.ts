import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACKEND_URL = `${environment.apiUrl}/books/`;

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[]; bookCount: number }>();

  addBook(title: string, author: string, price: number, imageURL: string, description: string) {
    let postData = {
      title: title,
      author: author,
      price: price,
      imageURL: imageURL,
      description: description,
    };
    this.http.post<{ message: string; book: Book }>(BACKEND_URL, postData).subscribe(resData => {
      this.router.navigate(['/']);
    });
  }

  getBooks(booksPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${booksPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; books: any; maxBooks: number }>(BACKEND_URL + queryParams)
      .pipe(
        map(bookData => {
          return {
            books: bookData.books.map(book => {
              return {
                id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                imageURL: book.imageURL,
                description: book.description,
                creator: book.creator,
              };
            }),
            maxBooks: bookData.maxBooks,
          };
        }),
      )
      .subscribe(transformedData => {
        this.books = transformedData.books;
        this.booksUpdated.next({ books: [...this.books], bookCount: transformedData.maxBooks });
      });
  }

  getBook(bookId: string) {
    return this.http.get<{
      _id: string;
      title: string;
      author: string;
      price: number;
      imageURL: string;
      description: string;
      creator: string;
    }>(BACKEND_URL + bookId);
  }

  getBooksupdateListener() {
    return this.booksUpdated.asObservable();
  }

  updateBook(id: string, title: string, author: string, price: number, imageUrl: string, description: string) {
    let bookData = {
      id: id,
      title: title,
      author: author,
      price: price,
      imagePath: imageUrl,
      description: description,
      creator: null,
    };
    this.http.put(BACKEND_URL + id, bookData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteBook(bookId: string) {
    return this.http.delete(BACKEND_URL + bookId);
  }
}
