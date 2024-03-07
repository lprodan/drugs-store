import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { ChooseStoreComponent } from './home/product-list/choose-store/choose-store.component';

export const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'store',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ChooseStoreComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: ProductListComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/store',
    pathMatch: 'full',
  },
];
