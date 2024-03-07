import { Component } from '@angular/core';
import { StoreListItemComponent } from './store-list-item/store-list-item.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  list = [
    {
      logoUrl:
        'https://apteka911.ua/images/favicons/apple-touch-icon-120x120.png',
      name: 'Apteka 911',
      id: 'ds1',
    },
    {
      logoUrl: 'https://zr.in.ua/ico/apple-touch-icon.png',
      name: 'ZR',
      id: 'ds2',
    },
    {
      logoUrl: 'https://anc.ua/favicon/favicon-128.png',
      name: 'ANC',
      id: 'ds3',
    },
  ];
}
