import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-season-results',
  templateUrl: './season-results.component.html',
  styleUrls: ['./season-results.component.css']
})
export class SeasonResultsComponent implements OnInit {
  results: any;
  clickedDriver: string

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
      this.results = this.myGroupBy(res, 'positionOrder');
      console.log(this.results);
    });
  }


  myGroupBy(xs, key) {
    var grouped = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

    var arr = [];
    for (var s in grouped) {
      arr.push(grouped[s])
    }
    return arr;
  };

  onClickHighlightProgress(evt) {
    console.log(evt);
    this.clickedDriver = (this.clickedDriver !== evt.target.innerText) ? evt.target.innerText.trim() : "";
    console.log(this.clickedDriver);
  }

}
