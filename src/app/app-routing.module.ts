import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBallotTemplatePageComponent } from './components/edit-ballot-template-page/edit-ballot-template-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PassPhonePageComponent } from './components/pass-phone-page/pass-phone-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { VotePageComponent } from './components/vote-page/vote-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'editBallot', component: EditBallotTemplatePageComponent, pathMatch: 'full'},
  { path: 'vote', component: VotePageComponent, pathMatch: 'full'},
  { path: 'pass', component: PassPhonePageComponent, pathMatch: 'full'},
  { path: 'results', component: ResultsPageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
