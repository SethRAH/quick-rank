import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BallotOption } from 'src/app/interfaces/ballot-option';
import { QuickRankModel } from 'src/app/interfaces/quick-rank-model';
import { CastVote } from 'src/app/state/actions';
import { QuickRankState } from 'src/app/state/quickRankState';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  ballotOptions: BallotOption[];
  constructor(
    private store: Store,
    private router: Router) { 
      this.ballotOptions = this.store.selectSnapshot<BallotOption[]>(QuickRankState.ballotOptions);
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.ballotOptions, event.previousIndex, event.currentIndex);
  }

  //TODO: We seem to be retaining order when re-routing back to voting... perhaps we need to randomize this?
  castVote(){
    console.log('In castVote (action handler)')
    let rankings = this.ballotOptions.map(o => o.id!);
    this.store.dispatch(new CastVote(rankings));
    
    this.ballotOptions = this.store.selectSnapshot<BallotOption[]>(QuickRankState.ballotOptions);
    this.router.navigate(['/pass']);
  }


}
