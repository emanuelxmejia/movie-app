import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { CommonModule }        from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

// --- components
import { NavbarComponent }  from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardsComponent }   from './components/cards/cards.component';
import { FooterComponent }  from './components/footer/footer.component';
import { LoaderComponent }  from './components/loader/loader.component';

// --- dialogs
import { MovieTrailerComponent } from './components/dialogs/movie-trailer/movie-trailer.component';

// --- pipes
import { DomSanitizerPipe }    from './pipes/dom-sanitizer.pipe';
import { NoMoviePosterPipe }   from './pipes/no-movie-poster.pipe';
import { NoPersonPicturePipe } from './pipes/no-person-picture.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    FooterComponent,
    MovieTrailerComponent,
    DomSanitizerPipe,
    NoMoviePosterPipe,
    NoPersonPicturePipe,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    FooterComponent,
    MovieTrailerComponent,
    NoPersonPicturePipe,
    LoaderComponent,
  ]
})
export class SharedModule { }