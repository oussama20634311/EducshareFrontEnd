import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUniversityComponent } from './display-university.component';

describe('DisplayUniversityComponent', () => {
  let component: DisplayUniversityComponent;
  let fixture: ComponentFixture<DisplayUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
