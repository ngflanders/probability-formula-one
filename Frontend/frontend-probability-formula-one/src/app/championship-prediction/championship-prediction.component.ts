import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-champtionship-prediction',
  templateUrl: './championship-prediction.component.html',
  styleUrls: []
})
export class ChampionshipPredictionComponent implements OnInit {

  lewis: any = {code: "HAM", prob: 60};
  seb: any = {code: "VET", prob: 34};
  rai: any = {code: "RAI", prob: 5};
  bot: any = {code: "BOT", prob: 1};
  drivers = [this.lewis, this.seb, this.rai, this.bot];

  constructor(
    private resultsService: FormulaoneInfoService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit() {
    this.drivers.forEach(d => d.probString = `${d.prob}%`);
  }




}
