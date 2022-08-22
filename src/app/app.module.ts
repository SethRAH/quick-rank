import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EditBallotTemplatePageComponent } from './components/edit-ballot-template-page/edit-ballot-template-page.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { AddEditBallotOptionDialogueComponent } from './components/add-edit-ballot-option-dialogue/add-edit-ballot-option-dialogue.component';
import { QuickRankState } from './state/quickRankState';
import { VotePageComponent } from './components/vote-page/vote-page.component';
import { PassPhonePageComponent } from './components/pass-phone-page/pass-phone-page.component';
import { ResultsPageComponent } from './components/results-page/results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    EditBallotTemplatePageComponent,
    PageLayoutComponent,
    AddEditBallotOptionDialogueComponent,
    VotePageComponent,
    PassPhonePageComponent,
    ResultsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([QuickRankState]),
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
