import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuickRankState, VoteTally } from 'src/app/state/quickRankState';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

  tallies : VoteTally[];

  constructor(
    private store: Store,
  ) { 
      this.tallies = this.store.selectSnapshot<VoteTally[]>(QuickRankState.results);
  }

  ngOnInit(): void {
  }

}
