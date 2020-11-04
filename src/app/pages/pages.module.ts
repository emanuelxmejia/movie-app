import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { BrowseComponent } from './browse/browse.component';
import { GenresComponent } from './genres/genres.component';
import { MovieComponent } from './movie/movie.component';
import { PersonComponent } from './person/person.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    BrowseComponent,
    GenresComponent,
    MovieComponent,
    PersonComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
