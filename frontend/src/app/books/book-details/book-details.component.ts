import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/cart.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css'],
    imports: [CommonModule,ReactiveFormsModule,MaterialModule,],
})
export class BookDetailsComponent implements OnInit {

  isLoading = false;
  bookId: string;
  book: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService,private cartService: CartService,private snackBar:MatSnackBar) { }

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
            creator: bookData.creator
          }
        })
      } else {
        this.bookId = null;
      }
    })
  }

  onAddToCart() {
    if (!this.book) {
      return;
    }
    this.cartService.addToCart(this.bookId);
    this.openSnackBar();
  }

  private openSnackBar() {
    this.snackBar.open('book added to cart', 'close', {
      duration: 1000,
    });
  }
}
