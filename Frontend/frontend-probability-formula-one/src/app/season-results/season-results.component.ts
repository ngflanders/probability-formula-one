import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute, Router} from "@angular/router";

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
  year: number;

  constructor(
    private resultsService: FormulaoneInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.year = +this.route.snapshot.paramMap.get('year');
    if (!this.year) {
      this.year = new Date().getFullYear();
    }
    this.resultsService.getRaceResults(this.year).subscribe(res => {
      this.uncleanedResults = res;
      this.positionResults = this.resultsService.myGroupBy(res, 'positionOrder');
      this.raceResults = this.resultsService.myGroupBy(res, 'country');
    });
  }

  onClickHighlightProgress(evt) {
    this.clickedDriver = (this.clickedDriver !== evt.target.innerText.trim()) ? evt.target.innerText.trim() : "";
  }

  openRaceResult(race) {
    console.log(this.year);
    console.log(race[0].round);
    this.router.navigate([`/race-result/${this.year}/${race[0].round}`]);
  }


}
