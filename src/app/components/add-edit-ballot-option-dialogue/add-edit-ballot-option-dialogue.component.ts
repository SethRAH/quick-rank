import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AddUpdateBallotOption } from 'src/app/state/actions';

export interface AddEditBallotOptionDTO {
  id: string | undefined,
  display: string
}

@Component({
  selector: 'app-add-edit-ballot-option-dialogue',
  templateUrl: './add-edit-ballot-option-dialogue.component.html',
  styleUrls: ['./add-edit-ballot-option-dialogue.component.scss']
})
export class AddEditBallotOptionDialogueComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEditBallotOptionDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditBallotOptionDTO,
    private store: Store
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save(display: string, id: string | undefined){
    
    console.log("I got to save!")
    console.log(`  display:${display}`);
    this.dialogRef.close(new AddUpdateBallotOption(display, id));
    //this.store.dispatch(new AddUpdateBallotOption(display, id))
  }

}
