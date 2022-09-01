import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { QuickRankState, ResultDto, VoteTally } from 'src/app/state/quickRankState';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

  result : ResultDto;

  constructor(
    private store: Store,
    private router: Router
  ) { 
      this.result = this.store.selectSnapshot<ResultDto>(QuickRankState.results);
  }

  ngOnInit(): void {
    if(this.result.winnerId === "") {
      this.router.navigate(['']);
    }
  }

}
