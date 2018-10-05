import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any;

  constructor(private resultsService: FormulaoneInfoService) {
  }

  ngOnInit() {
    this.resultsService.getRaceResults(2018).subscribe(res => {
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

}
