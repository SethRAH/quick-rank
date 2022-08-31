import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BallotOption } from 'src/app/interfaces/ballot-option';
import { QuickRankState } from 'src/app/state/quickRankState';

@Component({
  selector: 'app-pass-phone-page',
  templateUrl: './pass-phone-page.component.html',
  styleUrls: ['./pass-phone-page.component.scss']
})
export class PassPhonePageComponent implements OnInit {

  ballotOptions: BallotOption[];
  constructor(
    private store: Store,
    private router: Router) { 
      this.ballotOptions = this.store.selectSnapshot<BallotOption[]>(QuickRankState.ballotOptions);
  }

  ngOnInit(): void {
    this.ballotOptions = this.store.selectSnapshot<BallotOption[]>(QuickRankState.ballotOptions);
    if(this.ballotOptions.length < 1) {
      this.router.navigate(['']);
    }
  }

}
