import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {environment} from '../environments/environment'

@Injectable()
export class FormulaoneInfoService {

  constructor(private http: HttpClient) { }

  getRaces(year: number, round?: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/races/${year}/${round || ''}`);
  }

  getQualifying(year: number, round?: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/qualifying/${year}/${round || ''}`);
  }

  getRaceResults(year: number, round?: number): Observable<[any]> {
    return this.http.get<any>(`${environment.apiUrl}/results/${year}/${round || ''}`);
  }

  getSimulatedFinalStandings(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/simulations/${year}/${round || ''}`);
  }

  getDriverStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/standings/drivers/${year}/${round || ''}`);
  }

  getConstructorStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/standings/constructors/${year}/${round || ''}`);
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
