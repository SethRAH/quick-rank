import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassPhonePageComponent } from './pass-phone-page.component';

describe('PassPhonePageComponent', () => {
  let component: PassPhonePageComponent;
  let fixture: ComponentFixture<PassPhonePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassPhonePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassPhonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
