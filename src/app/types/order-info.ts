import { CartItem } from './cart-item';
import { LocalCartItem } from './local-cart-item';
import { Product } from './product';
import { Store } from './store';

export interface OrderInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
  cart: CartItem[];
}
