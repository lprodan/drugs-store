import { Component, Input, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LocalCartService } from '../../../services/local-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  private readonly localCartService = inject(LocalCartService);
  private readonly route = inject(ActivatedRoute);

  id = input.required<string>();
  imgUrl = input.required<string>();
  price = input.required<number>();
  name = input.required<string>();

  addToCart() {
    const { id: storeId } = this.route.snapshot.params;

    this.localCartService.add(storeId, this.id());
  }
}
