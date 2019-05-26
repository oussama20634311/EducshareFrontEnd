import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMattersComponent } from './list-matters.component';

describe('ListMattersComponent', () => {
  let component: ListMattersComponent;
  let fixture: ComponentFixture<ListMattersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMattersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
