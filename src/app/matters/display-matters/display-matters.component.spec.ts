import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMattersComponent } from './display-matters.component';

describe('DisplayMattersComponent', () => {
  let component: DisplayMattersComponent;
  let fixture: ComponentFixture<DisplayMattersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMattersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
