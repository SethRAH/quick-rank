import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBallotTemplatePageComponent } from './edit-ballot-template-page.component';

describe('EditBallotTemplatePageComponent', () => {
  let component: EditBallotTemplatePageComponent;
  let fixture: ComponentFixture<EditBallotTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBallotTemplatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBallotTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
