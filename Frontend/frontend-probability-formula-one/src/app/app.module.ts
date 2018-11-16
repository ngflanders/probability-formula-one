import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SeasonResultsComponent} from './season-results/season-results.component';
import {FormulaoneInfoService} from "../Services/formulaone-info.service";
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from "./navbar/navbar.component";
import {ChampionshipPredictionComponent} from "./championship-prediction/championship-prediction.component";
import {HomeComponent} from "./home/home.component";
import {RaceResultComponent} from "./race-result/race-result.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SeasonResultsComponent,
    RaceResultComponent,
    ChampionshipPredictionComponent
  ],
  providers: [FormulaoneInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
