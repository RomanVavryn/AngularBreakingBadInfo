import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {Subscription} from "rxjs";
import {QuoteInterface} from "../shared/interfaces/quote.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  randomQuoteSub: Subscription | undefined;
  randomQuote: QuoteInterface | undefined;
  quoteLoaded: boolean = false;

  statisticCount = {
    characters: 62,
    episodes: 102,
    quotes: 70,
    deaths: 271
  }

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.randomQuoteSub = this.http.getRandomQuotes()
      .subscribe((quote: QuoteInterface[]) => {
          this.randomQuote = quote[0];
          this.quoteLoaded = true;
        },
        error => {
          console.log('something went wrong!');
          console.error(error);
        }
      )
  }

  ngOnDestroy(): void {
    this.randomQuoteSub?.unsubscribe();
  }

}
