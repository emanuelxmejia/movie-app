import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent }    from './movie/movie.component';
import { BrowseComponent }   from './browse/browse.component';
import { GenresComponent }   from './genres/genres.component';
import { PersonComponent }   from './person/person.component';
import { SearchComponent }   from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'browse/:categoryName',
    component: BrowseComponent
  },
  {
    path: 'genres/:genreName',
    component: GenresComponent
  },
  {
    path: 'movie/:movieId',
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
