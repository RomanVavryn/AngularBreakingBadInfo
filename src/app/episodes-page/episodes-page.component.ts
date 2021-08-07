import {Component, OnInit} from '@angular/core';
import {EpisodesInterface} from "./episode.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EpisodesDataService} from "./episodes-data.service";

@Component({
  selector: 'app-episodes-page',
  templateUrl: './episodes-page.component.html',
  styleUrls: ['./episodes-page.component.scss']
})
export class EpisodesPageComponent implements OnInit {
  episodesArr: EpisodesInterface[] | undefined;
  episodesLoaded: boolean = false;

  categoryForm: FormGroup | undefined;
  idSearchForm: FormGroup | undefined;
  episodesCategory: string = 'Breaking+Bad';

  constructor(private episodesDataService: EpisodesDataService) {
  }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      'episodesCategory': new FormControl('Breaking+Bad')
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getEpisodesCategory(value.episodesCategory);
    })

    this.idSearchForm = new FormGroup({
      'episodeId': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(102)])
    })

    this.episodesDataService.getEpisodes(this.episodesCategory)
      .subscribe(
        (episodes: EpisodesInterface[]) => {
          this.episodesArr = episodes;
          this.episodesLoaded = true;
        });
  }

  private getEpisodesCategory(episodesCategory: string) {
    if (this.episodesCategory === episodesCategory) {
      return;
    }
    this.episodesCategory = episodesCategory;
    this.episodesLoaded = false;

    this.episodesDataService.getEpisodes(episodesCategory)
      .subscribe(
        (episodes: EpisodesInterface[]) => {
          this.episodesArr = episodes;
          this.episodesLoaded = true;
        });
  }

  onIdSearch() {
    const id = this.idSearchForm?.get('episodeId')?.value;
    if (id < 1 || id > 102) {
      this.idSearchForm?.patchValue({'episodeId': 1});
      return;
    }
    this.episodesLoaded = false;
    this.episodesDataService.getSingleEpisode(id)
      .subscribe(
        (episode: EpisodesInterface[]) => {
          this.episodesArr = episode;
          this.episodesLoaded = true;
        });
  }

}
