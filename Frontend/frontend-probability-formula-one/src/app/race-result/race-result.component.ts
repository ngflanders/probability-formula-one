import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {

  uncleanedResults: any;

  constructor(
    private resultsService: FormulaoneInfoService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit() {
    let year = +this.route.snapshot.paramMap.get('year');
    let round = +this.route.snapshot.paramMap.get('round');

    this.resultsService.getRaceResults(year, round).subscribe(res => {
      this.uncleanedResults = res;
      console.log(this.uncleanedResults)
    });
  }




}
