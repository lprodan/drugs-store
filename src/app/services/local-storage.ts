import { BehaviorSubject, Observable } from 'rxjs';

export class LocalStorage<T> {
  private readonly state$: BehaviorSubject<T>;
  #state: T;

  get state(): T {
    return this.#state;
  }

  set state(value: T) {
    this.#state = value;

    const newState = JSON.stringify(this.state);
    localStorage.setItem(this.key, newState);

    this.state$.next(value);
  }

  constructor(private readonly key: string) {
    const localState = localStorage.getItem(this.key);
    this.#state = localState ? JSON.parse(localState) : [];
    this.state$ = new BehaviorSubject(this.state);
  }

  getObservable(): Observable<T> {
    return this.state$.asObservable();
  }
}
