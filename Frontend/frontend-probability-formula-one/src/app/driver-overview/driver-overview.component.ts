import {Component, OnInit} from '@angular/core';
import {FormulaoneInfoService} from '../../Services/formulaone-info.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-driver-overview',
  templateUrl: './driver-overview.component.html',
  styleUrls: ['./driver-overview.component.css']
})
export class DriverOverviewComponent implements OnInit {

  driverRef: string = "";
  driverInfo;
  thisSeasonResults;
  WDCs:number = 0;

  constructor(
    private resultsService: FormulaoneInfoService,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  ngOnInit() {
    this.driverRef = this.route.snapshot.paramMap.get('ref');

    this.resultsService.getDriverInfo(this.driverRef).subscribe(res => {
      this.driverInfo = res;
      this.WDCs = res.reduce(function (accumulator, curr) {
        return curr.position === 1 ? accumulator + 1 : accumulator;
      },0);
    });

    this.resultsService.getDriverResults(this.driverRef, 2018).subscribe(res => {
      this.thisSeasonResults = res;
    });

  }

  openRace(race) {
    this.router.navigate([`/race-result/${race.year}/${race.round}`]);
  }


}
