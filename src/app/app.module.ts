import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from "./home-page/home-page.component";
import {NavbarComponent} from './shared/navbar/navbar.component';
import {CharactersPageComponent} from './characters-page/characters-page.component';
import {EpisodesPageComponent} from './episodes-page/episodes-page.component';
import {QuotePageComponent} from './quote-page/quote-page.component';
import {DeathsPageComponent} from './deaths-page/deaths-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {HttpClientModule} from "@angular/common/http";
import { ToTopBtnComponent } from './shared/to-top-btn/to-top-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CharactersPageComponent,
    EpisodesPageComponent,
    QuotePageComponent,
    DeathsPageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    ToTopBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
