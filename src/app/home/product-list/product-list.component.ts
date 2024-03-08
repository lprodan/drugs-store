import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ApiService } from '../../services/api.service';
import { combineLatest, forkJoin, map, switchMap, zip } from 'rxjs';
import { LocalFavoritesService } from '../../services/local-favorites.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ProductListItemComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly localFavourite = inject(LocalFavoritesService);

  list$ = combineLatest([
    this.route.params.pipe(
      switchMap((params) => this.apiService.getProducts(params['id']))
    ),
    this.localFavourite.getAll(),
  ]).pipe(
    map(([products, favs]) =>
      products.sort(
        (a, b) => (favs.has(b.id) ? 1 : 0) - (favs.has(a.id) ? 1 : 0)
      )
    )
  );
}
