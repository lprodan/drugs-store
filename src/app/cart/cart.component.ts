import { Component } from '@angular/core';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderFormComponent } from './order-form/order-form.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderFormComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
