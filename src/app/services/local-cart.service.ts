import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalCartItem } from '../types/local-cart-item';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalCartService {
  private readonly localStorage = new LocalStorage<LocalCartItem[]>('cart');

  getAll(): Observable<LocalCartItem[]> {
    return this.localStorage.getObservable();
  }

  add(storeId: string, productId: string, count = 1) {
    const state = this.localStorage.state;

    let cur = state.find(
      (value) => value.storeId === storeId && value.productId === productId
    );

    if (!cur) {
      state.push({ storeId, productId, count });
    } else {
      cur.count += count;
    }

    this.localStorage.state = state;
  }

  subtract(storeId: string, productId: string, count = 1) {
    const state = this.localStorage.state;

    const curIndex = state.findIndex(
      (value) => value.storeId === storeId && value.productId === productId
    );

    if (curIndex === -1) {
      return;
    }

    const cur = state[curIndex];

    cur.count -= count;

    if (cur.count === 0) {
      state.splice(curIndex, 1);
    }

    this.localStorage.state = state;
  }
}
