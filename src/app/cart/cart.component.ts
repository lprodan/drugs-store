import { Component } from '@angular/core';
import { CartListComponent } from './cart-list/cart-list.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
