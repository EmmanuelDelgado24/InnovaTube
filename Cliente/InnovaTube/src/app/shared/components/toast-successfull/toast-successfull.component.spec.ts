import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSuccessfullComponent } from './toast-successfull.component';

describe('ToastSuccessfullComponent', () => {
  let component: ToastSuccessfullComponent;
  let fixture: ComponentFixture<ToastSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSuccessfullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
