import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LocalCartService } from '../../../services/local-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { LocalFavoritesService } from '../../../services/local-favorites.service';

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
export class ProductListItemComponent implements OnInit {
  private readonly localCartService = inject(LocalCartService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly localFavourite = inject(LocalFavoritesService);

  id = input.required<string>();
  imgUrl = input.required<string>();
  price = input.required<number>();
  name = input.required<string>();

  isInCart$ = this.localCartService.getAll().pipe(
    map(
      (cart) =>
        cart.findIndex(
          (value) =>
            value.storeId === this.route.snapshot.params['id'] &&
            value.productId === this.id()
        ) !== -1
    ),
    takeUntilDestroyed()
  );
  isInCart = signal(false);

  isFavourite$ = this.localFavourite.getAll().pipe(
    map((favs) => favs.has(this.id())),
    takeUntilDestroyed()
  );
  isFavourite = signal(false);

  ngOnInit(): void {
    this.isInCart$.subscribe((v) => this.isInCart.set(v));
    this.isFavourite$.subscribe((v) => this.isFavourite.set(v));
  }

  addToCart() {
    const { id: storeId } = this.route.snapshot.params;

    this.localCartService.add(storeId, this.id());
    this.toastr.success('Has been added to your cart', this.name());
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  toggleFavourite() {
    if (!this.isFavourite()) {
      this.localFavourite.add(this.id());
    } else {
      this.localFavourite.remove(this.id());
    }
  }
}
