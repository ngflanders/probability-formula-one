import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-season-results',
  templateUrl: './season-results.component.html',
  styleUrls: ['./season-results.component.css']
})
export class SeasonResultsComponent implements OnInit {
  positionResults: any;
  raceResults: any;
  uncleanedResults: any;
  clickedDriver: string;

  constructor(
    private resultsService: FormulaoneInfoService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit() {
    let year = +this.route.snapshot.paramMap.get('year');
    if (!year) {
      year = new Date().getFullYear();
    }
    this.resultsService.getRaceResults(year).subscribe(res => {
      this.uncleanedResults = res;
      this.positionResults = this.resultsService.myGroupBy(res, 'positionOrder');
      this.raceResults = this.resultsService.myGroupBy(res, 'country');
    });
  }

  onClickHighlightProgress(evt) {
    this.clickedDriver = (this.clickedDriver !== evt.target.innerText.trim()) ? evt.target.innerText.trim() : "";
  }


}
