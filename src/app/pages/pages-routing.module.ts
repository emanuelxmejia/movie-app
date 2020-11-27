import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseComponent } from './browse/browse.component';
import { GenresComponent } from './genres/genres.component';
import { MovieComponent } from './movie/movie.component';
import { PersonComponent } from './person/person.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'browse/:categoryName',
    component: BrowseComponent
  },
  {
    path: 'browse/:categoryName/:page',
    component: BrowseComponent
  },
  {
    path: 'genres/:genreName',
    component: GenresComponent
  },
  {
    path: 'genres/:genreName/:page',
    component: GenresComponent
  },
  {
    path: 'movie/:movieId',
    component: MovieComponent
  },
  {
    path: 'movie/:categoryName/:movieId/:page',
    component: MovieComponent
  },
  {
    path: 'person/:personId',
    component: PersonComponent
  },
  {
    path: 'search/:searchValue',
    component: SearchComponent
  },
  {
    path: 'search/:searchValue/:page',
    component: SearchComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'browse/popular'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
