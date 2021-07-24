import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CharacterInterface} from "../shared/interfaces/character.interface";
import {HttpService} from "../shared/http.service";

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent implements OnInit, OnDestroy {
  charactersLoaded: boolean = false;
  charactersSub: Subscription | undefined;
  charactersArr: CharacterInterface[] | undefined;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.charactersSub = this.http.getAllCharacters()
      .subscribe(
        (data: CharacterInterface[]) => {
          this.charactersArr = data
          console.log(this.charactersArr)
          this.charactersLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  ngOnDestroy(): void {
    this.charactersSub?.unsubscribe();
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

}
