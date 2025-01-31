import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../common/services/cart.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [CommonModule,MaterialModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  isLoading = false
  cart = new BehaviorSubject([]);
  totalPrice: number = 0;

  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe((cartData) => {
      this.cart.next(cartData.cart.items ?? [])
      this.isLoading = false;
      this.getCartPrice();
      this.cdr.detectChanges();
    });
  
  }

  onRemoveItem(bookId: string) {
    this.openSnackBar();
    this.cartService.removeFromCart(bookId).subscribe((cartData) => {
      this.cart.next(cartData.cart.items ?? [])
      this.getCartPrice();
    }, () => this.isLoading = false);
  }

  onOrder() {
    this.cartService.clearCart().subscribe(() => {
      this.cart = null;
      this.totalPrice = 0;
      alert('thanks for buying with us');
    });
  }

  private getCartPrice() {
    this.totalPrice = 0;
    this.cart.value.forEach(item => {
      this.totalPrice += (item.price * item.quantity);
    });
  }

  private openSnackBar() {
    this.snackBar.open('book removed from cart','close', {
      duration: 1000,
    });
  }
}
