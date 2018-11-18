import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SeasonResultsComponent} from "./season-results/season-results.component";
import {ChampionshipPredictionComponent} from "./championship-prediction/championship-prediction.component";
import {HomeComponent} from "./home/home.component";
import {RaceResultComponent} from "./race-result/race-result.component";
import {DriverOverviewComponent} from "./driver-overview/driver-overview.component";

const routes: Routes = [
  {path: 'season-results', component: SeasonResultsComponent },
  {path: 'season-results/:year', component: SeasonResultsComponent },
  {path: 'race-result/:year/:round', component: RaceResultComponent },
  {path: 'championship-prediction', component: ChampionshipPredictionComponent},
  {path: 'driver/:ref', component: DriverOverviewComponent},
  {path: '', component: HomeComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
