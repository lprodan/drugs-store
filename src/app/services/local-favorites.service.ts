import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalFavoritesService {
  private readonly localStorage = new LocalStorage<string[]>('favorite');

  getAll(): Observable<Set<string>> {
    return this.localStorage.getObservable().pipe(map((val) => new Set(val)));
  }

  add(productId: string) {
    const state = this.localStorage.state;

    state.push(productId);

    this.localStorage.state = state;
  }

  remove(productId: string) {
    const state = this.localStorage.state;

    const curIndex = state.findIndex((id) => id === productId);

    if (curIndex === -1) {
      return;
    }

    state.splice(curIndex, 1);

    this.localStorage.state = state;
  }
}
