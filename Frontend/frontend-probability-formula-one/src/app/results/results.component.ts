import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../../Services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any;


  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.resultsService.getRaceResults(2018, 15).subscribe(res => {
      this.results = res;
      console.log(res);
    });
  }

}
