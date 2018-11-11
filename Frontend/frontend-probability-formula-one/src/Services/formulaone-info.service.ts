import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FormulaoneInfoService {

  baseAPI_url = "https://api.f1wiz.com";
  constructor(private http: HttpClient) { }

  getRaces(year: number, round?: number): Observable<any> {
    return this.http.get(`${this.baseAPI_url}/races/${year}/${round || ''}`);
  }

  getQualifying(year: number, round?: number): Observable<any> {
    return this.http.get(`${this.baseAPI_url}/qualifying/${year}/${round || ''}`);
  }

  getRaceResults(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPI_url}/results/${year}/${round || ''}`);
  }

  getSimulatedFinalStandings(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPI_url}/simulations/${year}/${round || ''}`);
  }

  getDriverStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPI_url}/standings/drivers/${year}/${round || ''}`);
  }

  getConstructorStandings(year:number,round?: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPI_url}/standings/constructors/${year}/${round || ''}`);
  }
}
