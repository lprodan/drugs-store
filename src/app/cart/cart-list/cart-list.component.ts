import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartListItemComponent, MatCardModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {}
