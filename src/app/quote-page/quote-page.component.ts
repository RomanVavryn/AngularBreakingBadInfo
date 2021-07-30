import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuoteInterface} from "../shared/interfaces/quote.interface";
import {HttpService} from "../shared/http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit, OnDestroy {
  quotesLoaded: boolean = false;
  quotesSub: Subscription | undefined;
  quoteArr: QuoteInterface[] | undefined;


  categoryForm: FormGroup | undefined;
  quotesCategory: string = 'all';
  idSearchForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  searchValue: string = ''; // need for searchForm

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {


    this.categoryForm = new FormGroup({
      'quoteCategory': new FormControl('all')
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getCategoryCharacters(value.quoteCategory);
    })

    this.idSearchForm = new FormGroup({
      'quoteId': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(102)])
    })

    this.searchForm = new FormGroup({
      'filter': new FormControl(null)
    })

    this.quotesSub = this.http.getQuotes(this.quotesCategory)
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

  private getCategoryCharacters(quoteCategory: string) {
    if (this.quotesCategory === quoteCategory) {
      return;
    }
    this.quotesCategory = quoteCategory;
    this.quotesLoaded = false;
    this.quotesSub?.unsubscribe();

    this.quotesSub = this.http.getQuotes(quoteCategory).subscribe(
      (quotes: QuoteInterface[]) => {
        this.quoteArr = quotes;
        this.quotesLoaded = true;
      },
      (error => {
        console.log('something went wrong!');
        console.error(error);
      })
    );

  }

  onIdSearch() {
    const id = this.idSearchForm?.get('quoteId')?.value;
    if (id < 1 || id > 30 && id < 63 || id > 102) {
      this.idSearchForm?.patchValue({'quoteId': 1});
      return;
    }
    this.quotesLoaded = false;
    this.quotesSub?.unsubscribe();

    this.quotesSub = this.http.getSingleQuote(id).subscribe(
      (quotes: QuoteInterface[]) => {
        this.quoteArr = quotes;
        this.quotesLoaded = true;
      },
      (error => {
        console.log('something went wrong!');
        console.error(error);
      })
    );
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue || !newSearchValue) {
      return;
    }

    this.quotesSub?.unsubscribe();
    this.quotesLoaded = false;
    this.searchValue = newSearchValue;
    this.categoryForm?.patchValue({'quoteCategory': 'all'})
    this.quotesCategory = 'all';

    this.quotesSub = this.http.getAuthorQuotes(newSearchValue)
      .subscribe(
        (quotes: QuoteInterface[]) => {
          this.quoteArr = quotes
          this.quotesLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  getRandomQuote() {
    this.quotesSub?.unsubscribe();
    this.quotesLoaded = false;

    this.quotesSub = this.http.getRandomQuotes()
      .subscribe(
        (quote: QuoteInterface[]) => {
          this.quoteArr = quote
          this.quotesLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  ngOnDestroy(): void {
    this.quotesSub?.unsubscribe();
  }

}
