import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // api
  baseUrl: string = 'https://www.breakingbadapi.com/api';

  // Character,s
  allCharacters: string = this.baseUrl + '/characters';
  singleCharacter: string = this.baseUrl + '/characters/';
  randomCharacter: string = this.baseUrl + '/character/random';

  // Episode,s
  allEpisodes: string = this.baseUrl + '/episodes';
  singleEpisode: string = this.baseUrl + '/episodes/';

  // Quotes,s
  allQuotes: string = this.baseUrl + '/quotes';
  singleQuote: string = this.baseUrl + '/quotes/';
  randomQuote: string = this.baseUrl + '/quote/random';

  // Death,s
  allDeaths: string = this.baseUrl + '/deaths';
  // singleDeath: string = this.baseUrl + 'death';
  randomDeath: string = this.baseUrl + '/random-death';
  deathCount: string = this.baseUrl + '/death-count';

  constructor(private http: HttpClient) {
  }

  getAllCharacters(): Observable<any> {
    return this.http.get(this.allCharacters);
  }

  getSingleCharacter(id: number): Observable<any> {
    return this.http.get(this.singleCharacter + id);
  }

  getRandomCharacter(): Observable<any> {
    return this.http.get(this.randomCharacter);
  }

  getAllEpisodes(): Observable<any> {
    return this.http.get(this.allEpisodes);
  }

  getSingleEpisode(id: number): Observable<any> {
    return this.http.get(this.singleEpisode + id);
  }

  getAllQuotes(): Observable<any> {
    return this.http.get(this.allQuotes);
  }

  getSingleQuotes(id: number): Observable<any> {
    return this.http.get(this.singleQuote + id);
  }

  getRandomQuotes(): Observable<any> {
    return this.http.get(this.randomQuote);
  }

  getAllDeaths(): Observable<any> {
    return this.http.get(this.allDeaths);
  }

  // getSingleDeath(): Observable<any> {
  //   return this.http.get(this.singleDeath);
  // }

  getRandomDeath(): Observable<any> {
    return this.http.get(this.randomDeath);
  }

  getDeathCount(): Observable<any> {
    return this.http.get(this.deathCount);
  }

}
