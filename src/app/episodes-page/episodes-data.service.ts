import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {Observable} from "rxjs";
import {EpisodesInterface} from "./episode.interface";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EpisodesDataService {

  constructor(private httpService: HttpService) {
  }

  getEpisodes(episodesCategory: string): Observable<EpisodesInterface[]> {
    return this.httpService.getEpisodes(episodesCategory).pipe(take(1));
  }

  getSingleEpisode(id: number): Observable<EpisodesInterface[]> {
    return this.httpService.getSingleEpisode(id).pipe(take(1));
  }
}
