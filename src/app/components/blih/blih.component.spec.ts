import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlihComponent } from './blih.component';

describe('BlihComponent', () => {
  let component: BlihComponent;
  let fixture: ComponentFixture<BlihComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlihComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
