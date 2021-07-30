import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../shared/http.service";
import {EpisodesInterface} from "../shared/interfaces/episode.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-episodes-page',
  templateUrl: './episodes-page.component.html',
  styleUrls: ['./episodes-page.component.scss']
})
export class EpisodesPageComponent implements OnInit, OnDestroy {
  episodesSub: Subscription | undefined;
  episodesArr: EpisodesInterface[] | undefined;
  episodesLoaded: boolean = false;

  categoryForm: FormGroup | undefined;
  episodesCategory: string = 'Breaking+Bad';
  idSearchForm: FormGroup | undefined;


  constructor(private http: HttpService) {
  }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      'episodesCategory': new FormControl('Breaking+Bad')
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getCategoryCharacters(value.episodesCategory);
    })

    this.idSearchForm = new FormGroup({
      'episodeId': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(102)])
    })

    this.episodesSub = this.http.getEpisodes(this.episodesCategory)
      .subscribe(
        (episodes: EpisodesInterface[]) => {
          this.episodesArr = episodes;
          this.episodesLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  private getCategoryCharacters(episodesCategory: string) {
    if (this.episodesCategory === episodesCategory) {
      return;
    }
    this.episodesCategory = episodesCategory;
    this.episodesLoaded = false;
    this.episodesSub?.unsubscribe();

    this.episodesSub = this.http.getEpisodes(episodesCategory).subscribe(
      (episodes: EpisodesInterface[]) => {
        this.episodesArr = episodes;
        this.episodesLoaded = true;
      },
      (error => {
        console.log('something went wrong!');
        console.error(error);
      })
    );

  }

  onIdSearch() {
    const id = this.idSearchForm?.get('episodeId')?.value;
    if (id < 1 || id > 102) {
      this.idSearchForm?.patchValue({'episodeId': 1});
      return;
    }
    this.episodesLoaded = false;
    this.episodesSub?.unsubscribe();

    this.episodesSub = this.http.getSingleEpisode(id).subscribe(
      (episode: EpisodesInterface[]) => {
        this.episodesArr = episode;
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

}
