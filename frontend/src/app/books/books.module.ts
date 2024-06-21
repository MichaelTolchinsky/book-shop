import { NgModule } from "@angular/core";
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartModule } from "../cart/cart.module";
import { CartService } from "../cart/cart.service";

@NgModule({
  declarations: [
    BookCreateComponent,
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    CartModule,
  ],
  providers: [CartService]
})
export class BooksModule { }