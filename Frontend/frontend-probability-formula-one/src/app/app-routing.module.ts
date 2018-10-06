import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SeasonResultsComponent} from "./season-results/season-results.component";

const routes: Routes = [
  {path: 'season-results', component: SeasonResultsComponent },
  {path: 'season-results/:year', component: SeasonResultsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
