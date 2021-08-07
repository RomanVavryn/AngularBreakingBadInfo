import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {Observable} from "rxjs";
import {CharacterInterface} from "./character.interface";
import {HttpParams} from "@angular/common/http";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {

  constructor(private httpService: HttpService) {
  }

  getCharacters(count?: string, page?: number, category?: string, search?: string): Observable<CharacterInterface[]> {
    let params = new HttpParams();
    if (count !== '99') {
      params = params.append('limit', count!);
      params = params.append('offset', page!);
    }
    if (category !== 'all') {
      params = params.append('category', category!);
    }
    if (!!search) {
      params = params.append('name', search!);
    }
    return this.httpService.getCharacters(params).pipe(take(1));
  }

  getRandomCharacters(count: number): Observable<CharacterInterface[]> {
    return this.httpService.getRandomCharacters(count);
  }

  getSingleCharacter(id: number): Observable<CharacterInterface[]> {
    return this.httpService.getSingleCharacter(id).pipe(take(1));
  }

}
