import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContributorsComponent } from './modal-contributors.component';

describe('ModalContributorsComponent', () => {
  let component: ModalContributorsComponent;
  let fixture: ComponentFixture<ModalContributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
