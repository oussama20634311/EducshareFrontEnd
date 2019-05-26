import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducshareInfoComponent } from './educshare-info.component';

describe('EducshareInfoComponent', () => {
  let component: EducshareInfoComponent;
  let fixture: ComponentFixture<EducshareInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducshareInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducshareInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
