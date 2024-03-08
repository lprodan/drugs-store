import { Component, EventEmitter, inject } from '@angular/core';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { MatButtonModule } from '@angular/material/button';
import { LocalCartService } from '../services/local-cart.service';
import { ApiService } from '../services/api.service';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    OrderFormComponent,
    CartListComponent,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly localCart = inject(LocalCartService);
  private readonly api = inject(ApiService);
  private readonly toastr = inject(ToastrService);

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+\d{10,15}$/),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
  });

  cart$ = this.localCart
    .getAll()
    .pipe(switchMap((cart) => this.api.getCart(cart)));

  totalPrice$ = this.cart$.pipe(
    map((cart) =>
      cart.reduce((prev, curr) => prev + curr.product.price * curr.count, 0)
    )
  );

  loading = false;

  async order() {
    this.loading = true;

    if (!this.form.valid) {
      this.toastr.error('Please fill in order form properly', 'Error');
    } else {
      try {
        const localCart = await firstValueFrom(this.localCart.getAll());
        const orderId = await this.api.order({
          ...this.form.value,
          cart: localCart,
        });

        this.localCart.removeAll();
        this.toastr.success(
          `Your order number is ${orderId} and it has been sent`,
          'Success'
        );
      } catch (e: any) {
        this.toastr.error(e.message, 'System Error');
      }
    }

    this.loading = false;
  }
}
