import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../../../common/models/book.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BooksService } from 'src/app/common/services/books.service';

@Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css'],
    imports: [CommonModule,ReactiveFormsModule,MaterialModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCreateComponent implements OnInit {
  isLoading = false;
  form: UntypedFormGroup;
  imagePreview: string;
  book:Book;

  private mode = 'create';
  private bookId:string
  private booksService = inject(BooksService);
  private route = inject(ActivatedRoute);
  
  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      title: new UntypedFormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      author: new UntypedFormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
        asyncValidators: [mimeType]
      }),
      price: new UntypedFormControl(null, {
        validators: [Validators.required, Validators.min(10), Validators.max(1500)],
      }),
      image: new UntypedFormControl(null, {
        validators: [Validators.required]
      }),
      description: new UntypedFormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      })
    })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('bookId')){
        this.mode = "edit";
        this.bookId = paramMap.get('bookId');
        this.isLoading = true;
        this.booksService.getBook(this.bookId).subscribe(bookData => {
          this.isLoading = false;
          this.book = {
            id:bookData._id,
            title:bookData.title,
            author:bookData.author,
            price:bookData.price,
            imageURL:bookData.imageURL,
            description:bookData.description,
            creator:bookData.creator
          };

          this.form.setValue({
            title:this.book.title,
            author:this.book.author,
            price:this.book.price,
            image:this.book.imageURL,
            description:this.book.description
          });
        });
      } else {
        this.mode = 'create';
        this.bookId = null;
      }
    })
  }

  onSaveBook() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.booksService.addBook(
        this.form.value.title,
        this.form.value.author,
        this.form.value.price,
        this.form.value.image,
        this.form.value.description,
      )
    } else {
      this.booksService.updateBook(
        this.bookId,
        this.form.value.title,
        this.form.value.author,
        this.form.value.price,
        this.form.value.image,
        this.form.value.description,
      )
    }
    this.form.reset();
  }
}
