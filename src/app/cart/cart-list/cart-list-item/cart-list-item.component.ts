import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LocalCartService } from '../../../services/local-cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
})
export class CartListItemComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) imgUrl!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) quantity!: number;
  @Input({ required: true }) from!: string;
  @Input({ required: true }) storeId!: string;
  @Input({ required: true }) productId!: string;

  constructor(private readonly localCart: LocalCartService) {}

  add() {
    this.localCart.add(this.storeId, this.productId);
  }

  subtract() {
    this.localCart.subtract(this.storeId, this.productId);
  }
}
