import {Component, OnInit} from '@angular/core';
import {DeathInterface} from "./death.interface";
import {RandomDeathInterface} from "./random-death.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {DeathDataService} from "./death-data.service";

@Component({
  selector: 'app-deaths-page',
  templateUrl: './deaths-page.component.html',
  styleUrls: ['./deaths-page.component.scss']
})
export class DeathsPageComponent implements OnInit {
  deathsArr: DeathInterface[] | undefined;
  deathsLoaded: boolean = false;

  randomDeath: RandomDeathInterface | undefined;
  randomDeathLoaded: boolean = false;

  deathCount: number | undefined;

  searchForm: FormGroup | undefined;
  searchValue: string = ''; // need for searchForm

  constructor(private deathDataService: DeathDataService) {
  }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      'filter': new FormControl('')
    })

    this.getAllDeaths();

    this.deathDataService.getDeathCount()
      .subscribe(
        (deathsCount) => {
          console.log('deathsCount')
          console.log(deathsCount)
          this.deathCount = deathsCount[0].deathCount;
        });
  }

  private getAllDeaths() {
    this.deathsLoaded = false;
    this.deathDataService.getAllDeaths()
      .subscribe((deaths: DeathInterface[]) => {
        this.deathsArr = deaths;
        this.deathsLoaded = true;
      });
  }

  onRandomDeath() {
    this.randomDeathLoaded = false;
    this.deathDataService.getRandomDeath()
      .subscribe(
        (death: RandomDeathInterface) => {
          this.randomDeath = death;
          this.randomDeathLoaded = true;
        });
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue) {
      return;
    }
    this.searchValue = newSearchValue;
    this.deathsLoaded = false;

    if (!newSearchValue) {
      this.getAllDeaths();
    } else {
      this.deathDataService.getCharacterDeathInfo(newSearchValue)
        .subscribe(
          (characterDeathInfo: DeathInterface[]) => {
            this.deathsArr = characterDeathInfo;
            this.deathsLoaded = true;
          });
    }
  }
}
