import { Observable } from 'rxjs';
import { Store } from '../types/store';
import { Product } from '../types/product';

export abstract class ApiService {
  abstract getStores(): Observable<Store[]>;

  abstract getProducts(storeId: string): Observable<Product[]>;
}
