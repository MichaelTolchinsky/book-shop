import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from '../../../common/models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CartService } from 'src/app/common/services/cart.service';
import { BooksService } from 'src/app/common/services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent implements OnInit {
  isLoading = false;
  bookId: string;
  book: Book;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private booksService = inject(BooksService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bookId')) {
        this.bookId = paramMap.get('bookId');
        this.isLoading = true;
        this.booksService.getBook(this.bookId).subscribe(bookData => {
          this.isLoading = false;
          this.book = {
            id: bookData._id,
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            imageURL: bookData.imageURL,
            description: bookData.description,
            creator: bookData.creator,
          };

          this.cdr.detectChanges();
        });
      } else {
        this.bookId = null;
      }
    });
  }

  onAddToCart() {
    if (!this.book) {
      return;
    }

    this.cartService.addToCart(this.bookId).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.openSnackBar();
  }

  private openSnackBar() {
    this.snackBar.open('book added to cart', 'close', {
      duration: 1000,
    });
  }
}
