import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-champtionship-prediction',
  templateUrl: './championship-prediction.component.html',
  styleUrls: []
})
export class ChampionshipPredictionComponent implements OnInit {

  year: number;
  round: number;
  predictedPlaces;
  displayTable;

  constructor(
    private resultsService: FormulaoneInfoService,
  ) {
  }

  ngOnInit() {

    if (!this.year) {
      this.year = new Date().getFullYear();
    }
    this.resultsService.getSimulatedFinalStandings(this.year).subscribe(res => {
      this.predictedPlaces = res;
      this.displayTable = this.buildTable(this.predictedPlaces);
      console.log(this.displayTable)
    });
  }

  buildTable(places) {
    let x = new Array(places.length);
    for (let e = 0; e < places.length; e++) {
      x[e] = {probabilityData: new Array(places.length), driver: ""};
      for (let f = 0; f < places.length; f++) {
        x[e].probabilityData[f] = {}
      }
    }

    for (let e = 0; e < places.length; e++) {
      for (let f = 0; f < places[e].length; f++) {
        if (!x[e].driver && places[e][f]) {
          x[e].driver = places[e][f].code
        }
        x[e].probabilityData[places[e][f].place - 1] = places[e][f];
      }
    }
    return x;
  }
}
