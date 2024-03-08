import { TestBed } from '@angular/core/testing';

import { LocalFavoritesService } from './local-favorites.service';

describe('LocalFavoritesService', () => {
  let service: LocalFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
