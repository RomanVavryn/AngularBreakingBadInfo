import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {QuoteInterface} from "./quote.interface";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuoteDataService {
  constructor(private httpService: HttpService) {
  }

  getQuotes(quoteCategory: string): Observable<QuoteInterface[]> {
    return this.httpService.getQuotes(quoteCategory).pipe(take(1));
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
