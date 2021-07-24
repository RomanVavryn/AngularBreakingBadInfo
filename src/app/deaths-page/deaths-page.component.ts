import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../shared/http.service";
import {DeathInterface} from "../shared/interfaces/death.interface";

@Component({
  selector: 'app-deaths-page',
  templateUrl: './deaths-page.component.html',
  styleUrls: ['./deaths-page.component.scss']
})
export class DeathsPageComponent implements OnInit, OnDestroy {
  deathsLoaded: boolean = false;
  deathsSub: Subscription | undefined;
  deathsArr: DeathInterface[] | undefined;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.deathsSub = this.http.getAllDeaths()
      .subscribe((deaths: DeathInterface[]) => {
          this.deathsArr = deaths;
          this.deathsLoaded = true;
        },
        error => {
          console.log('something went wrong!');
          console.error(error);
        }
      )
  }

  ngOnDestroy(): void {
    this.deathsSub?.unsubscribe();
  }

}
