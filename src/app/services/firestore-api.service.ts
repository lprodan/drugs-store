import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, of, switchMap, zip } from 'rxjs';
import { Product } from '../types/product';
import { Store } from '../types/store';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  documentId,
  query,
  where,
} from '@angular/fire/firestore';

interface Stock {
  id: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreApiService extends ApiService {
  private firestore = inject(Firestore);
  private storesCollection = collection(
    this.firestore,
    'stores'
  ) as CollectionReference<Store>;
  private productsCollection = collection(
    this.firestore,
    'products'
  ) as CollectionReference<Omit<Product, 'price'>>;

  override getStores(): Observable<Store[]> {
    return collectionData(this.storesCollection, { idField: 'id' });
  }

  override getProducts(storeId: string): Observable<Product[]> {
    const stocksCollection = collection(
      this.firestore,
      `stores/${storeId}/stocks`
    ) as CollectionReference<Stock>;

    return collectionData(stocksCollection, { idField: 'id' }).pipe(
      switchMap((stocks) => {
        if (!stocks.length) {
          return of([]);
        }

        const stocksMap = new Map<string, Stock>();
        stocks.forEach((item) => stocksMap.set(item.id, item));

        const productsQuery = query(
          this.productsCollection,
          where(documentId(), 'in', [...stocksMap.keys()])
        );

        return collectionData(productsQuery, { idField: 'id' }).pipe(
          map((products) =>
            products.map((product) => ({
              ...product,
              ...stocksMap.get(product.id)!,
            }))
          )
        );
      })
    );
  }
}
