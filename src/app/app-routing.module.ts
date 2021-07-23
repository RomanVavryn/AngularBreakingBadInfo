import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {CharactersPageComponent} from "./characters-page/characters-page.component";
import {EpisodesPageComponent} from "./episodes-page/episodes-page.component";
import {QuotePageComponent} from "./quote-page/quote-page.component";
import {DeathsPageComponent} from "./deaths-page/deaths-page.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'characters', component: CharactersPageComponent},
  {path: 'episodes', component: EpisodesPageComponent},
  {path: 'quote', component: QuotePageComponent},
  {path: 'deaths', component: DeathsPageComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
