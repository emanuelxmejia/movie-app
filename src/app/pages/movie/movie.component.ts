import { Component, OnInit }      from '@angular/core';
import { Location }               from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog }              from '@angular/material/dialog';
import { forkJoin }               from 'rxjs';
import { Movie }                  from '../../shared/models/movie.model';
import { MovieCast }              from '../../shared/models/movie-cast.model';
import { RequestService }         from '../../shared/services/request.service';
import { MovieGenre }             from '../../shared/models/movie-genre.model';
import { MovieDetails }           from '../../shared/models/movie-details.model';
import { UrlParamsService }       from '../../shared/services/url-params.service';
import { MovieTrailerComponent }  from '../../shared/components/dialogs/movie-trailer/movie-trailer.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails = <MovieDetails>{};

  movies:      Movie[] = [];
  movieCast:   MovieCast[] = [];
  movieGenres: MovieGenre[] = [];

  backdropPathUrl = 'http://image.tmdb.org/t/p/original';
  profilePath     = 'https://image.tmdb.org/t/p/w300/';

  page:       number;
  movieId:    number;
  totalPages: number;

  loading = false;

  constructor(
    private router:            Router,
    private dialog:            MatDialog,
    private location:          Location,
    private API:               RequestService,
    private activatedRoute:    ActivatedRoute,
    private urlParamsService:  UrlParamsService,
  ) {
    this.urlParamsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.movieId = params['param'].movieId;
        this.page    = params['queryParam'].page;

        this.getMovieInformation();
      });
  }

  ngOnInit(): void {
  }

  getMovieBackdrop(movieDetails: MovieDetails) {
    const backdropPath = movieDetails.backdrop_path;

    if (backdropPath == undefined) return;

    return `
      linear-gradient(rgba(0,0,0,.50) 0%, rgba(0,0,0,.50) 100%),
      url('${ this.backdropPathUrl }${ backdropPath }')
    `;
  }

  getMovieInformation() {
    this.loading = true;

    const movieDetails         = this.API.getMovieDetailsByMovieId(this.movieId);
    const movieCast            = this.API.getMovieCastByMovieId(this.movieId);
    const movieRecommendations = this.API.getRecommendationsByMovieId(this.movieId, this.page);

    forkJoin([movieDetails, movieCast, movieRecommendations]).subscribe(res => {
      this.loading = false;

      this.movieDetails = res[0];
      this.movieGenres  = res[0].genres;

      this.movieCast = res[1];

      this.page       = res[2].page;
      this.movies     = res[2].results;
      this.totalPages = res[2].total_pages;
    });
  }

  goToMovieGenre(movieGenre: MovieGenre) {
    this.router.navigate(['genres/', movieGenre.name]);
  }

  goToPersonByPersonId(personId: number) {
    this.router.navigate(['person/', personId]);
  }

  openMovieTrailerDialog() {
    const dialogRef = this.dialog.open(MovieTrailerComponent, {
      width:      '560px',
      height:     '315px',
      panelClass: 'custom-dialog',
      data: {
        movieId: this.movieDetails.id
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
