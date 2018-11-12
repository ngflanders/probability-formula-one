import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from "../Services/formulaone-info.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Probability Formula One';

  driverStandings: any;
  constructorStandings: any;

  constructor(
    private resultsService: FormulaoneInfoService,
  ) {
  }

  ngOnInit() {
    this.resultsService.getDriverStandings(new Date().getFullYear(), 18).subscribe(res => {
      this.driverStandings = res;
      console.log(this.driverStandings);
    });
    this.resultsService.getConstructorStandings(new Date().getFullYear(), 18).subscribe(res => {
      this.constructorStandings = res;
      console.log(this.constructorStandings);
    });
  }

}
