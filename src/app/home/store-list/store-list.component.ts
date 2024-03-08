import { Component, Inject, inject } from '@angular/core';
import { StoreListItemComponent } from './store-list-item/store-list-item.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [
    StoreListItemComponent,
    MatListModule,
    MatCardModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent {
  private apiService = inject(ApiService);

  list$ = this.apiService.getStores();
}
