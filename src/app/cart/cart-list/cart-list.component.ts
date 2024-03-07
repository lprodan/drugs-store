import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartListItemComponent, MatCardModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  items = [
    {
      id: 'i1',
      imgUrl:
        'https://root.tblcdn.com/img/goods/bcd06d58-d8c8-4a14-964c-e63cc752a71d/1/img_0.jpg?v=AAAAAAnhZ3Y',
      name: 'Paracetamol',
      price: 222,
      quantity: 4,
      from: '911',
    },
    {
      id: 'i1',
      imgUrl:
        'https://root.tblcdn.com/img/goods/bcd06d58-d8c8-4a14-964c-e63cc752a71d/1/img_0.jpg?v=AAAAAAnhZ3Y',
      name: 'Paracetamol',
      price: 222,
      quantity: 4,
      from: '911',
    },
    {
      id: 'i1',
      imgUrl:
        'https://root.tblcdn.com/img/goods/bcd06d58-d8c8-4a14-964c-e63cc752a71d/1/img_0.jpg?v=AAAAAAnhZ3Y',
      name: 'Paracetamol',
      price: 222,
      quantity: 4,
      from: '911',
    },
  ];
}
