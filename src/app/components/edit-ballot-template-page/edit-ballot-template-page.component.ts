import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { BallotOption } from 'src/app/interfaces/ballot-option';
import { AddUpdateBallotOption } from 'src/app/state/actions';
import { QuickRankState } from 'src/app/state/quickRankState';
import { AddEditBallotOptionDialogueComponent } from '../add-edit-ballot-option-dialogue/add-edit-ballot-option-dialogue.component';

@Component({
  selector: 'app-edit-ballot-template-page',
  templateUrl: './edit-ballot-template-page.component.html',
  styleUrls: ['./edit-ballot-template-page.component.scss']
})
export class EditBallotTemplatePageComponent implements OnInit {

  @Select(QuickRankState.ballotOptions) ballotOptions$!: Observable<BallotOption[]>;

  constructor(
    public dialog: MatDialog,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
  }

  openAddEditDialog(optionID: string | undefined, display: string){
    const dialogRef = this.dialog.open(AddEditBallotOptionDialogueComponent, {
      width: '250px',
      data: {id: optionID, display: display}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("I got to afterClosed!")
      console.log(JSON.stringify(result));
      this.store.dispatch(new AddUpdateBallotOption(result.display, result.id));
    });
  }
}
