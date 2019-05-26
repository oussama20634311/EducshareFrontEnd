import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoriComponent } from './list-favori.component';

describe('ListFavoriComponent', () => {
  let component: ListFavoriComponent;
  let fixture: ComponentFixture<ListFavoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFavoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFavoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
