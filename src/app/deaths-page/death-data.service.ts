import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {Observable} from "rxjs";
import {DeathInterface} from "./death.interface";
import {take} from "rxjs/operators";
import {RandomDeathInterface} from "./random-death.interface";

@Injectable({
  providedIn: 'root'
})
export class DeathDataService {

  constructor(private httpService: HttpService) {
  }

  getAllDeaths(): Observable<DeathInterface[]> {
    return this.httpService.getDeaths().pipe(take(1));
  }

  getDeathCount(): Observable<any> {
    return this.httpService.getDeathCount().pipe(take(1));
  }

  getCharacterDeathInfo(search: string): Observable<DeathInterface[]> {
    return this.httpService.getCharacterDeathInfo(search).pipe(take(1));
  }

  getRandomDeath(): Observable<RandomDeathInterface> {
    return this.httpService.getRandomDeath().pipe(take(1));
  }
}
