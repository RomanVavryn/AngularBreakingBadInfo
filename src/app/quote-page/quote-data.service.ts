import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {QuoteInterface} from "./quote.interface";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuoteDataService {
  constructor(private httpService: HttpService) {
  }

  getQuotes(quoteCategory: string): Observable<QuoteInterface[]> {
    let params = new HttpParams();
    if (quoteCategory !== 'all') {
      params = params.append('series', quoteCategory!);
    }
    return this.httpService.getQuotes(params).pipe(take(1));
  }

  getSingleQuote(id: number): Observable<QuoteInterface[]> {
    return this.httpService.getSingleQuote(id).pipe(take(1));
  }

  onNameSearch(searchValue: string): Observable<QuoteInterface[]> {
    return this.httpService.getAuthorQuotes(searchValue).pipe(take(1));
  }

  getRandomQuote(): Observable<QuoteInterface[]> {
    return this.httpService.getRandomQuotes().pipe(take(1));
  }
}
