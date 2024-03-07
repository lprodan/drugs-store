import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';

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
  products = [
    {
      imgUrl:
        'https://root.tblcdn.com/img/goods/bcd06d58-d8c8-4a14-964c-e63cc752a71d/1/img_0.jpg?v=AAAAAAnhZ3Y',
      name: 'Paracetamol',
      price: 38.3,
      id: 'pr1',
    },
    {
      imgUrl:
        'https://root.tblcdn.com/img/goods/1ca1ce6c-4924-4061-8cf6-965f870c80f8/1/img_0.jpg?v=AAAAAAnuUI8',
      name: 'Nalgezin',
      price: 232.2,
      id: 'pr1',
    },
    {
      imgUrl:
        'https://root.tblcdn.com/img/goods/03623971-0b04-457a-9b4d-b6a1eb5ed6ee/1/img_0.jpg?v=AAAAAAiBqg',
      name: 'Affida',
      price: 300,
      id: 'pr1',
    },
    {
      imgUrl:
        'https://root.tblcdn.com/img/goods/0f5f3990-9bc6-40fc-bd92-feb83c45300d/1/img_0.jpg?v=AAAAAAn3YD4',
      name: 'Aspirin',
      price: 140,
      id: 'pr1',
    },
    {
      imgUrl:
        'https://root.tblcdn.com/img/goods/ad39fcee-b054-40cd-8ce2-0090103470fd/1/img_0.jpg?v=AAAAAAiBTs',
      name: 'Analgin',
      price: 45.5,
      id: 'pr1',
    },
  ];
}
