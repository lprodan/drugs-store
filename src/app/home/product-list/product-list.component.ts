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
import { switchMap } from 'rxjs';

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
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  list$ = this.route.params.pipe(
    switchMap((params) => this.apiService.getProducts(params['id']))
  );
}
