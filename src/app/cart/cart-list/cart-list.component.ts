import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { CartItem } from '../../types/cart-item';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartListItemComponent, MatCardModule, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  list = input.required<CartItem[] | null>();
}
