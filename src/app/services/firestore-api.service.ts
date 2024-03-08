import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, combineLatest, map, of, switchMap, zip } from 'rxjs';
import { Product } from '../types/product';
import { Store } from '../types/store';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  documentId,
  query,
  where,
} from '@angular/fire/firestore';
import { CartItem } from '../types/cart-item';
import { LocalCartItem } from '../types/local-cart-item';
import { OrderInfo } from '../types/order-info';

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
  private ordersCollection = collection(
    this.firestore,
    'orders'
  ) as CollectionReference<OrderInfo>;

  override getStores(): Observable<Store[]> {
    return collectionData(this.storesCollection, { idField: 'id' });
  }

  override getProducts(storeId: string): Observable<Product[]> {
    const stocksCollection = this.getStocksCollectionRef(storeId);

    return collectionData(stocksCollection, { idField: 'id' }).pipe(
      switchMap((stocks) => {
        if (!stocks.length) {
          return of([]);
        }

        const stocksMap = new Map<string, Stock>();
        stocks.forEach((item) => stocksMap.set(item.id, item));

        return this.queryInId(this.productsCollection, [
          ...stocksMap.keys(),
        ]).pipe(
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

  override getCart(localCart: LocalCartItem[]): Observable<CartItem[]> {
    if (!localCart.length) {
      return of([]);
    }

    const storeSet = new Set<string>();
    const productSet = new Set<string>();
    const storeProductsMap = new Map<string, string[]>();

    for (const localItem of localCart) {
      const { storeId, productId } = localItem;
      storeSet.add(storeId);
      productSet.add(productId);

      if (!storeProductsMap.has(storeId)) {
        storeProductsMap.set(storeId, []);
      }

      storeProductsMap.get(storeId)!.push(productId);
    }

    const stores$ = this.queryInId(this.storesCollection, [...storeSet]);
    const products$ = this.queryInId(this.productsCollection, [...productSet]);
    const stocksMap$ = this.getStocksMap(storeProductsMap);

    return combineLatest([stores$, products$, stocksMap$]).pipe(
      map(([stores, products, stocksMap]) => {
        const storeMap = new Map<string, Store>(
          stores.map((store) => [store.id, store])
        );
        const productMap = new Map<string, Omit<Product, 'price'>>(
          products.map((product) => [product.id, product])
        );

        const result: CartItem[] = [];

        for (const item of localCart) {
          const { storeId, productId } = item;
          result.push({
            ...item,
            store: storeMap.get(storeId)!,
            product: {
              ...productMap.get(productId)!,
              ...stocksMap.get(storeId)!.get(productId)!,
            },
          });
        }

        return result;
      })
    );
  }

  override order(orderInfo: OrderInfo): Promise<string> {
    return addDoc(this.ordersCollection, orderInfo).then((order) => order.id);
  }

  private queryInId<
    AppModelType extends DocumentData,
    DbModelType extends DocumentData
  >(
    collectionRef: CollectionReference<AppModelType, DbModelType>,
    inArr: string[]
  ) {
    const _query = query(collectionRef, where(documentId(), 'in', inArr));

    return collectionData(_query, { idField: 'id' });
  }

  private getStocksCollectionRef(storeId: string) {
    const stocksCollection = collection(
      this.firestore,
      `stores/${storeId}/stocks`
    ) as CollectionReference<Stock>;

    return stocksCollection;
  }

  private getStocksMap(storeProductsMap: Map<string, string[]>) {
    const stocks$ = [];

    for (const storeId of storeProductsMap.keys()) {
      const ids = storeProductsMap.get(storeId)!;
      const colRef = this.getStocksCollectionRef(storeId);
      const stock$ = this.queryInId(colRef, ids).pipe(
        map((stocks) => [
          storeId,
          new Map(stocks.map((stock) => [stock.id, stock])),
        ])
      );

      stocks$.push(stock$);
    }

    return combineLatest(stocks$).pipe(
      map((value: any) => new Map<string, Map<string, Stock>>(value))
    );
  }
}
