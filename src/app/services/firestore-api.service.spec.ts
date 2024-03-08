import { TestBed } from '@angular/core/testing';

import { FirestoreApiService } from './firestore-api.service';

describe('FirestoreApiService', () => {
  let service: FirestoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
