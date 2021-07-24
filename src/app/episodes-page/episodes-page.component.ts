import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../shared/http.service";
import {EpisodesInterface} from "../shared/interfaces/episode.interface";

@Component({
  selector: 'app-episodes-page',
  templateUrl: './episodes-page.component.html',
  styleUrls: ['./episodes-page.component.scss']
})
export class EpisodesPageComponent implements OnInit, OnDestroy {
  episodesLoaded: boolean = false;
  episodesSub: Subscription | undefined;
  episodesArr: EpisodesInterface[] | undefined;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.episodesSub = this.http.getAllEpisodes()
      .subscribe(
        (data: EpisodesInterface[]) => {
          this.episodesArr = data
          this.episodesLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  ngOnDestroy(): void {
    this.episodesSub?.unsubscribe();
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
