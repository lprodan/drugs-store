import { Observable } from 'rxjs';
import { Store } from '../types/store';
import { Product } from '../types/product';
import { CartItem } from '../types/cart-item';
import { LocalCartItem } from '../types/local-cart-item';
import { OrderInfo } from '../types/order-info';

export abstract class ApiService {
  abstract getStores(): Observable<Store[]>;

  abstract getProducts(storeId: string): Observable<Product[]>;

  abstract getCart(localCart: LocalCartItem[]): Observable<CartItem[]>;

  abstract order(orderInfo: OrderInfo): Promise<string>;
}
