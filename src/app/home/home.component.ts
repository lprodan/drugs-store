import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreListComponent } from './store-list/store-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent, StoreListComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
