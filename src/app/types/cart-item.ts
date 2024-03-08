import { LocalCartItem } from './local-cart-item';
import { Product } from './product';
import { Store } from './store';

export interface CartItem extends LocalCartItem {
  store: Store;
  product: Product;
}
