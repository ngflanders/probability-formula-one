import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) { }


  getRaceResults(year: number, round?: number): Observable<any> {
    return this.http.get(`http://localhost:3000/results/${year}/${round}`);
  }

}
