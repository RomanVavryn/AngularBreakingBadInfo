import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuoteInterface} from "../shared/interfaces/quote.interface";
import {HttpService} from "../shared/http.service";

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit, OnDestroy {
  quotesLoaded: boolean = false;
  quotesSub: Subscription | undefined;
  quoteArr: QuoteInterface[] | undefined;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.quotesSub = this.http.getAllQuotes()
      .subscribe((quotes: QuoteInterface[]) => {
          this.quoteArr = quotes;
          this.quotesLoaded = true;
        },
        error => {
          console.log('something went wrong!');
          console.error(error);
        }
      )
  }

  ngOnDestroy(): void {
    this.quotesSub?.unsubscribe();
  }
}
