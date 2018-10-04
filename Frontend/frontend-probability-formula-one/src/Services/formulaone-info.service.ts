import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FormulaoneInfoService {

  constructor(private http: HttpClient) { }

  getRaces(year: number, round?: number): Observable<any> {
    return this.http.get(`http://localhost:3000/races/${year}/${round || ''}`);
  }

  getQualifying(year: number, round?: number): Observable<any> {
    return this.http.get(`http://localhost:3000/races/${year}/${round || ''}`);
  }

  getRaceResults(year: number, round?: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/results/${year}/${round || ''}`);
  }

}
