import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../shared/http.service";
import {DeathInterface} from "../shared/interfaces/death.interface";
import {RandomDeathInterface} from "../shared/interfaces/random-death.interface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-deaths-page',
  templateUrl: './deaths-page.component.html',
  styleUrls: ['./deaths-page.component.scss']
})
export class DeathsPageComponent implements OnInit, OnDestroy {
  deathsArr: DeathInterface[] | undefined;
  randomDeath: RandomDeathInterface | undefined;
  deathsLoaded: boolean = false;
  randomDeathLoaded: boolean = false;
  deathCount: number | undefined;

  deathsSub: Subscription | undefined;
  randomDeathSub: Subscription | undefined;
  searchForm: FormGroup | undefined;
  searchValue: string = ''; // need for searchForm

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      'filter': new FormControl('')
    })

    this.getAllDeaths();

    this.http.getDeathCount().subscribe(
      (deathsCount) => {
        this.deathCount = deathsCount[0].deathCount;
      },
      error => {
        console.log('something went wrong!');
        console.error(error);
      }
    )

  }

  private getAllDeaths(): void {
    this.deathsSub = this.http.getDeaths().subscribe((deaths: DeathInterface[]) => {
        this.deathsArr = deaths;
        this.deathsLoaded = true;
      },
      error => {
        console.log('something went wrong!');
        console.error(error);
      }
    )
  }

  onRandomDeath() {
    this.randomDeathLoaded = false;
    this.randomDeathSub?.unsubscribe();

    this.randomDeathSub = this.http.getRandomDeath()
      .subscribe(
        (death: RandomDeathInterface) => {
          this.randomDeath = death;
          this.randomDeathLoaded = true;
        }
      )
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue) {
      return;
    }
    this.deathsSub?.unsubscribe()
    this.deathsLoaded = false;
    this.searchValue = newSearchValue;
    if (!newSearchValue) {
      this.getAllDeaths();
    } else {
      this.deathsSub = this.http.getCharacterDeathInfo(newSearchValue).subscribe(
        (characterDeathInfo) => {
          this.deathsArr = characterDeathInfo;
          this.deathsLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.deathsSub?.unsubscribe();
    this.randomDeathSub?.unsubscribe();
  }

}
