import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FormulaoneInfoService {

  constructor(private http: HttpClient) { }

  getRaces(year: number, round?: number): Observable<any> {
    return this.http.get(`http://localhost:3000/races/${year}/${round || ''}`);
  }

  getQualifying(year: number, round?: number): Observable<any> {
    return this.http.get(`http://localhost:3000/qualifying/${year}/${round || ''}`);
  }

  getRaceResults(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/results/${year}/${round || ''}`);
  }

  getSimulatedFinalStandings(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/simulations/${year}/${round || ''}`);
  }

  getDriverStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/standings/drivers/${year}/${round || ''}`);
  }

  getConstructorStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/standings/constructors/${year}/${round || ''}`);
  }
}
