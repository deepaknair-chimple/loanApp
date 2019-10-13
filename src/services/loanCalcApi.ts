import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable(
  { providedIn: 'root'}
)
export class LoanCalculator {
  constructor(private httpClient: HttpClient) {}
  getData(amount: string, month: string): Observable<string> {
  return this.httpClient.get<string>(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${month}`)
    .pipe(map((res: any) => {
      return res;
    }));
  }
}
