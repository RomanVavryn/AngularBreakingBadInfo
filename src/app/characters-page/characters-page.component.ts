import {Component, OnInit} from '@angular/core';
import {CharacterInterface} from "./character.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CharactersDataService} from "./characters-data.service";

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent implements OnInit {
  // character,s
  charactersArr: CharacterInterface[] | undefined;
  charactersLoaded: boolean = false;
  // filters
  charactersPerPageForm: FormGroup | undefined;
  categoryForm: FormGroup | undefined;
  searchForm: FormGroup | undefined;
  randomForm: FormGroup | undefined;
  idSearchForm: FormGroup | undefined;
  // options
  charactersCategory: string = 'all';
  charactersPerPage: string = '12';
  charactersPage: number = 0;
  searchValue: string = ''; // need for searchForm
  nextPageDisabled: boolean = false;
  prevPageDisabled: boolean = false;

  constructor(private charactersDataService: CharactersDataService) {
  }

  ngOnInit(): void {
    this.charactersPerPageForm = new FormGroup({
      'characterShowCount': new FormControl('12')
    })

    this.charactersPerPageForm.valueChanges.subscribe(value => {
      this.changeCharactersPerPage(value.characterShowCount);
    })

    this.categoryForm = new FormGroup({
      'categoryCharacters': new FormControl('all')
    })

    this.categoryForm.valueChanges.subscribe(value => {
      this.getCategoryCharacters(value.categoryCharacters);
    })

    this.searchForm = new FormGroup({
      'filter': new FormControl(null)
    })

    this.randomForm = new FormGroup({
      'randomCount': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(36)])
    })

    this.idSearchForm = new FormGroup({
      'characterId': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(116)])
    })

    this.charactersDataService.getCharacters(
      this.charactersPerPage, this.charactersPage, this.charactersCategory, this.searchValue)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters;
          this.charactersLoaded = true;
          this.canChangePage();
        });
  }

  private getCategoryCharacters(categoryCharacters: string) {
    if (this.charactersCategory === categoryCharacters) {
      return;
    }
    this.charactersCategory = categoryCharacters;
    this.charactersLoaded = false;
    this.charactersPage = 0;
    this.canChangePage();

    this.charactersDataService.getCharacters(this.charactersPerPage, this.charactersPage, categoryCharacters)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters;
          this.charactersLoaded = true;
          this.canChangePage();
        });
  }

  private changeCharactersPerPage(count: string) {
    if (this.charactersPerPage === count) {
      return;
    }
    this.charactersPerPage = count;
    this.charactersPage = 0;
    this.charactersLoaded = false;
    this.canChangePage();

    this.charactersDataService.getCharacters(count, this.charactersPage, this.charactersCategory)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters;
          this.charactersLoaded = true;
          this.canChangePage();
        });
  }

  private canChangePage(): void {
    if (this.charactersPerPage === '99') {
      this.prevPageDisabled = true;
      this.nextPageDisabled = true;
      return;
    }
    if (this.charactersCategory === 'Breaking+Bad' && this.charactersArr![0].char_id === 1) {
      this.prevPageDisabled = true;
      this.nextPageDisabled = false;
      return;
    }
    if (this.charactersCategory === 'Breaking+Bad' && this.charactersArr![this.charactersArr?.length! - 1].char_id === 57) {
      this.prevPageDisabled = false;
      this.nextPageDisabled = true;
      return;
    }
    if (this.charactersPerPage !== '1' && this.charactersCategory === 'Better+Call+Saul') {
      this.prevPageDisabled = true;
      this.nextPageDisabled = true;
      return;
    }
    if (this.charactersCategory === 'Better+Call+Saul' && this.charactersArr![0].char_id === 7) {
      this.prevPageDisabled = true;
      this.nextPageDisabled = false;
      return;
    }
    if (this.charactersCategory === 'Better+Call+Saul' && this.charactersArr![this.charactersArr?.length! - 1].char_id === 116) {
      this.prevPageDisabled = false;
      this.nextPageDisabled = true;
      return;
    }
    if (this.charactersArr![0].char_id === 1) {
      this.prevPageDisabled = true;
      this.nextPageDisabled = false;
      return;
    }
    if (this.charactersArr![this.charactersArr?.length! - 1].char_id === 116) {
      this.prevPageDisabled = false;
      this.nextPageDisabled = true;
      return;
    }
    this.prevPageDisabled = false;
    this.nextPageDisabled = false;
  }

  private reset(): void {
    this.charactersPerPage = '99';
    this.charactersPerPageForm?.patchValue({'characterShowCount': '99'});
    this.charactersPage = 0;
    this.charactersCategory = 'all';
    this.categoryForm?.patchValue({'categoryCharacters': 'all'});
    this.searchValue = '';
    this.searchForm?.patchValue({'filter': ''});
    this.charactersLoaded = false;
  }

  onNameSearch() {
    const newSearchValue = this.searchForm?.get('filter')?.value?.split(' ').join('+');
    if (this.searchValue === newSearchValue) {
      return;
    }

    this.charactersLoaded = false;
    this.searchValue = newSearchValue;
    this.charactersPerPageForm?.patchValue({'characterShowCount': '99'})
    this.charactersPerPage = '99';
    this.charactersPage = 0;
    this.categoryForm?.patchValue({'categoryCharacters': 'all'})
    this.charactersCategory = 'all';

    this.charactersDataService.getCharacters(
      this.charactersPerPage, this.charactersPage, this.charactersCategory, newSearchValue)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters
          this.charactersLoaded = true;
        });
  }

  onPageChange(action: string) {
    this.charactersLoaded = false;
    this.canChangePage();

    if (action === 'next' && +this.charactersPerPage !== 1) {
      this.charactersPage += +this.charactersPerPage;
    } else if (action === 'next') {
      this.charactersPage += 1;
    }
    if (action === 'prev' && +this.charactersPerPage !== 1) {
      this.charactersPage -= +this.charactersPerPage;
    } else if (action === 'prev') {
      this.charactersPage -= 1;
    }

    this.charactersDataService.getCharacters(this.charactersPerPage, this.charactersPage, this.charactersCategory)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters;
          this.charactersLoaded = true;
          this.canChangePage();
        })
  }

  onRandomCharacters(): void {
    if (this.randomForm?.get('randomCount')?.value <= 0
    ) {
      this.randomForm?.patchValue({'randomCount': 1})
      return;
    }
    if (this.randomForm?.get('randomCount')?.value >= 37) {
      this.randomForm?.patchValue({'randomCount': 36})
      return;
    }

    this.reset();
    this.canChangePage();

    this.charactersDataService.getRandomCharacters(+this.randomForm?.get('randomCount')?.value)
      .subscribe(
        (characters: CharacterInterface[]) => {
          this.charactersArr = characters
          this.charactersLoaded = true;
          this.canChangePage();
        });
  }

  onIdSearch() {
    const id = this.idSearchForm?.get('characterId')?.value;
    if (id < 1 || id > 57 && id < 112 || id > 116) {
      this.idSearchForm?.patchValue({'characterId': 1});
      return;
    }

    this.reset();
    this.canChangePage();
    this.charactersDataService.getSingleCharacter(id)
      .subscribe(
        (character: CharacterInterface[]) => {
          this.charactersArr = character;
          this.charactersLoaded = true;
          this.canChangePage();
        });
  }
}
