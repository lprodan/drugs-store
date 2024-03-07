import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
})
export class CartListItemComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) imgUrl!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) quantity!: number;
}
