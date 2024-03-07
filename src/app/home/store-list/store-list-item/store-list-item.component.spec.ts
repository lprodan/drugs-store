import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListItemComponent } from './store-list-item.component';

describe('StoreListItemComponent', () => {
  let component: StoreListItemComponent;
  let fixture: ComponentFixture<StoreListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
