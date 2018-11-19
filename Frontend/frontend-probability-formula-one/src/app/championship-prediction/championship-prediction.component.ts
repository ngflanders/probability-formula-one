import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-champtionship-prediction',
  templateUrl: './championship-prediction.component.html',
  styleUrls: ['./championship-prediction.component.css']
})
export class ChampionshipPredictionComponent implements OnInit {

  year: number;
  round: number;
  predictedPlacesByDriver;
  predictedPlaces;
  displayTableByDriver;

  constructor(
    private resultsService: FormulaoneInfoService,
    private router: Router
  ) {
  }

  ngOnInit() {

    if (!this.year) {
      this.year = new Date().getFullYear();
    }
    this.resultsService.getSimulatedFinalStandings(this.year).subscribe(res => {
      this.predictedPlaces = res;
      this.predictedPlacesByDriver = this.resultsService.myGroupBy(res, 'driverRef');
      this.displayTableByDriver = this.buildTable(this.predictedPlacesByDriver);
    });
  }

  openDriver(prediction) {
    this.router.navigate([`/driver/${prediction[0].driverRef}`]);
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
        var prob = places[e][f].Probability;
        if (prob > .99 && prob < 1) {
          places[e][f].Desc = ">99"
        } else if (prob < .01 && prob > 0) {
          places[e][f].Desc = "<1"
        }
        if (!isNaN( places[e][f].Probability)) {
          places[e][f].Probability = Math.round(places[e][f].Probability * 100) / 100;
        }
        x[e].probabilityData[places[e][f].place - 1] = places[e][f];
      }
    }
    return x;
  }
}
