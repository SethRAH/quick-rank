import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBallotOptionDialogueComponent } from './add-edit-ballot-option-dialogue.component';

describe('AddEditBallotOptionDialogueComponent', () => {
  let component: AddEditBallotOptionDialogueComponent;
  let fixture: ComponentFixture<AddEditBallotOptionDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBallotOptionDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBallotOptionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
