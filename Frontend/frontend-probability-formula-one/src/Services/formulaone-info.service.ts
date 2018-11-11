import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FormulaoneInfoService {

  constructor(private http: HttpClient) { }

  getRaces(year: number, round?: number): Observable<any> {
    return this.http.get(`https://localhost:6001/races/${year}/${round || ''}`);
  }

  getQualifying(year: number, round?: number): Observable<any> {
    return this.http.get(`https://localhost:6001/qualifying/${year}/${round || ''}`);
  }

  getRaceResults(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`https://localhost:6001/results/${year}/${round || ''}`);
  }

  getSimulatedFinalStandings(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`https://localhost:6001/simulations/${year}/${round || ''}`);
  }

  getDriverStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`https://localhost:6001/standings/drivers/${year}/${round || ''}`);
  }

  getConstructorStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`https://localhost:6001/standings/constructors/${year}/${round || ''}`);
  }
}
