import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // api
  baseUrl: string = 'https://www.breakingbadapi.com/api';

  // Character,s
  Characters: string = this.baseUrl + '/characters';
  singleCharacter: string = this.baseUrl + '/characters/';
  randomCharacter: string = this.baseUrl + '/character/random';

  // Episode,s
  Episodes: string = this.baseUrl + '/episodes';
  singleEpisode: string = this.baseUrl + '/episodes/';

  // Quotes,s
  Quotes: string = this.baseUrl + '/quotes';
  singleQuote: string = this.baseUrl + '/quotes/';
  AuthorQuote: string = this.baseUrl + '/quote';
  randomQuote: string = this.baseUrl + '/quote/random';

  // Death,s
  allDeaths: string = this.baseUrl + '/deaths';
  deathInfo: string = this.baseUrl + '/death';

  deathCount: string = this.baseUrl + '/death-count';
  randomDeath: string = this.baseUrl + '/random-death';

  constructor(private http: HttpClient) {
  }

  // characters
  getCharacters(count?: string, page?: number, category?: string, search?: string): Observable<any> {
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

    return this.http.get(this.Characters, {params: params});
  }

  getSingleCharacter(id: number): Observable<any> {
    return this.http.get(this.singleCharacter + id);
  }

  getRandomCharacters(count: number): Observable<any> {
    return this.http.get(this.randomCharacter, {params: new HttpParams().set('limit', count)});
  }

  // episodes
  getEpisodes(category: string): Observable<any> {
    return this.http.get(this.Episodes, {params: {'series': category}});
  }

  getSingleEpisode(id: number): Observable<any> {
    return this.http.get(this.singleEpisode + id);
  }

  // quotes
  getQuotes(category: string): Observable<any> {
    let params = new HttpParams();
    if (category !== 'all') {
      params = params.append('series', category!);
    }
    return this.http.get(this.Quotes, {params: params});
  }

  getSingleQuote(id: number): Observable<any> {
    return this.http.get(this.singleQuote + id);
  }

  getAuthorQuotes(search: string): Observable<any> {
    return this.http.get(this.AuthorQuote, {params: {'author': search}});
  }

  getRandomQuotes(): Observable<any> {
    return this.http.get(this.randomQuote);
  }

  //deaths
  getDeaths(): Observable<any> {
    return this.http.get(this.allDeaths);
  }

  getCharacterDeathInfo(search: string): Observable<any> {
    return this.http.get(this.deathInfo, {params: {'name': search}});
  }

  getDeathCount(search?: string): Observable<any> {
    let params = new HttpParams();
    if (!!search) {
      params = params.append('name', search!);
    }
    return this.http.get(this.deathCount, {params: params});
  }

  getRandomDeath(): Observable<any> {
    return this.http.get(this.randomDeath);
  }

}
