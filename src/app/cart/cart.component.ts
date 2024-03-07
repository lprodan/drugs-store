import { Component } from '@angular/core';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderFormComponent, CartListComponent, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
