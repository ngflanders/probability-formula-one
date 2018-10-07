import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SeasonResultsComponent} from "./season-results/season-results.component";
import {ChampionshipPredictionComponent} from "./championship-prediction/championship-prediction.component";

const routes: Routes = [
  {path: 'season-results', component: SeasonResultsComponent },
  {path: 'season-results/:year', component: SeasonResultsComponent },
  {path: 'championship-prediction', component: ChampionshipPredictionComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
