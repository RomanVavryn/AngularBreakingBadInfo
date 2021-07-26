import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CharacterInterface} from "../shared/interfaces/character.interface";
import {HttpService} from "../shared/http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent implements OnInit, OnDestroy {
  // character,s
  charactersLoaded: boolean = false;
  charactersSub: Subscription | undefined;
  charactersArr: CharacterInterface[] | undefined;

  // filters
  idSearchForm: FormGroup | undefined;
  categoryForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  searchValue: string | undefined;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.charactersSub = this.http.getAllCharacters()
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters
          this.charactersLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );

    this.idSearchForm = new FormGroup({
      'characterId': new FormControl(1, [Validators.min(1), Validators.max(116)])
    })

    this.searchForm = new FormGroup({
      'filter': new FormControl(null)
    })

    this.categoryForm = new FormGroup({
      'categoryCharacters': new FormControl('all', [Validators.required])
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getCategoryCharacters(value.categoryCharacters.toString());
    })

  }

  private getCategoryCharacters(categoryCharacters: string) {
    this.charactersLoaded = false;
    this.charactersSub?.unsubscribe();

    switch (categoryCharacters) {
      case 'all':
        this.charactersSub = this.http.getAllCharacters().subscribe(
          (characters: CharacterInterface[]) => {
            this.charactersArr = characters;
            this.charactersLoaded = true;
          },
          (error => {
            console.log('something went wrong!');
            console.error(error);
          })
        );
        break;

      case 'Breaking+Bad':
      case 'Better+Call+Saul':
        this.charactersSub = this.http.getCharactersByCategory(categoryCharacters).subscribe(
          (characters: CharacterInterface[]) => {
            this.charactersArr = characters;
            this.charactersLoaded = true;
          },
          (error => {
            console.log('something went wrong!');
            console.error(error);
          })
        );
        break;
    }
  }

  onRandomCharacter(): void {
    this.charactersLoaded = false;

    this.charactersSub = this.http.getRandomCharacter()
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters
          this.charactersLoaded = true;
        },
        (error => {
          console.log('something went wrong!');
          console.error(error);
        })
      );
  }

  onIdSearch() {
    const id = this.idSearchForm?.get('characterId')?.value;

    if (+id >= 1 && +id <= 57 || +id >= 112 && +id <= 116) {
      this.charactersSub?.unsubscribe();
      this.charactersSub = this.http.getSingleCharacter(id).subscribe(character => {
        this.charactersArr = character;
      });
    }

    this.idSearchForm?.reset()
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue) {
      return;
    }

    this.charactersSub?.unsubscribe();
    this.charactersLoaded = false;
    this.searchValue = newSearchValue;

    if (!newSearchValue) {
      console.log('empty search')
      this.charactersSub = this.http.getAllCharacters()
        .subscribe(
          (characters: CharacterInterface[]) => {
            this.charactersArr = characters
            this.charactersLoaded = true;
          },
          (error => {
            console.log('something went wrong!');
            console.error(error);
          })
        );
    }

    this.charactersSub = this.http.getCharacterByName(newSearchValue).subscribe(
      (character: CharacterInterface[]) => {
        this.charactersArr = character;
        this.charactersLoaded = true;
      },
      (error => {
        console.log('something went wrong!');
        console.error(error);
      })
    )
  }

  ngOnDestroy(): void {
    this.charactersSub?.unsubscribe();
  }

}
