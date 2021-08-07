import {Component, OnInit} from '@angular/core';
import {QuoteInterface} from "./quote.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuoteDataService} from "./quote-data.service";

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit {
  quoteArr: QuoteInterface[] | undefined;
  quotesLoaded: boolean = false;

  categoryForm: FormGroup | undefined;
  idSearchForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  quotesCategory: string = 'all';
  searchValue: string = '';

  constructor(private quoteDataService: QuoteDataService) {
  }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      'quoteCategory': new FormControl('all')
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getCategoryQuotes(value.quoteCategory);
    })

    this.idSearchForm = new FormGroup({
      'quoteId': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(102)])
    })

    this.searchForm = new FormGroup({
      'filter': new FormControl(null)
    })

    this.quoteDataService.getQuotes(this.quotesCategory)
      .subscribe(
        (quotes: QuoteInterface[]) => {
          this.quoteArr = quotes;
          this.quotesLoaded = true;
        }
      );
  }

  private getCategoryQuotes(quoteCategory: string) {
    if (this.quotesCategory === quoteCategory) {
      return;
    }
    this.quotesCategory = quoteCategory;
    this.quotesLoaded = false;

    this.quoteDataService.getQuotes(quoteCategory)
      .subscribe(
        (quotes: QuoteInterface[]) => {
          this.quoteArr = quotes;
          this.quotesLoaded = true;
        });
  }

  private validId(id: number) {
    if (id < 1 || id > 30 && id < 63 || id > 102) {
      this.idSearchForm?.patchValue({'quoteId': 1});
      return false;
    }
    return true;
  }

  private resetCategory() {
    this.categoryForm?.patchValue({'quoteCategory': 'all'})
    this.quotesCategory = 'all';
  }

  onIdSearch() {
    const id = this.idSearchForm?.get('quoteId')?.value;
    if (this.validId(id)) {
      this.quotesLoaded = false;
      this.quoteDataService.getSingleQuote(id)
        .subscribe((quotes: QuoteInterface[]) => {
          this.quoteArr = quotes;
          this.quotesLoaded = true;
        });
      return;
    }
    return;
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue || !newSearchValue) {
      return;
    }

    this.searchValue = newSearchValue;
    this.quotesLoaded = false;
    this.resetCategory();

    this.quoteDataService.onNameSearch(newSearchValue)
      .subscribe((quotes: QuoteInterface[]) => {
        this.quoteArr = quotes;
        this.quotesLoaded = true;
      });
  }

  getRandomQuote() {
    this.quotesLoaded = false;

    this.quoteDataService.getRandomQuote()
      .subscribe(
        (quote: QuoteInterface[]) => {
          this.quoteArr = quote
          this.quotesLoaded = true;
        });
  }

}
