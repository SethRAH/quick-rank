import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { 
      this.tallies = this.store.selectSnapshot<VoteTally[]>(QuickRankState.results);
  }

  ngOnInit(): void {
    if(this.tallies.length < 1) {
      this.router.navigate(['']);
    }
  }

}
