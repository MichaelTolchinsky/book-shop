import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../../common/models/book.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BooksService } from 'src/app/common/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, MaterialModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  userId: string;
  isLoading = false;
  books: Book[] = [];
  totalBooks = 0;
  booksPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private booksSub: Subscription;
  private booksService = inject(BooksService);
  private authservice = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.isLoading = true;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
    this.userId = this.authservice.getUserId();
    this.booksSub = this.booksService
      .getBooksupdateListener()
      .pipe(
        map(bookData => {
          bookData.books.map(book => {
            book.description = book.description.slice(0, 150);
          });
          return bookData;
        }),
      )
      .subscribe(booksData => {
        this.isLoading = false;
        this.totalBooks = booksData.bookCount;
        this.books = booksData.books;
        this.cdr.detectChanges();
      });
    this.isUserAuthenticated = this.authservice.getIsAuth();
  }

  onDelete(bookId: string) {
    this.isLoading = true;
    this.booksService.deleteBook(bookId).subscribe(
      () => {
        this.booksService.getBooks(this.booksPerPage, this.currentPage);
      },
      () => (this.isLoading = false),
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.booksPerPage = pageData.pageSize;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
