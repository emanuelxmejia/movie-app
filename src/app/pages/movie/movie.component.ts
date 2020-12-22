import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { MovieDetails } from '../../shared/models/movie-details.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { MovieGenre } from '../../shared/models/movie-genre.model';
import { MatDialog } from '@angular/material/dialog';
import { MovieTrailerComponent } from '../../shared/components/dialogs/movie-trailer/movie-trailer.component';
import { MovieCast } from 'src/app/shared/models/movie-cast.model';
import { UrlParamsService } from '../../shared/services/url-params.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails = <MovieDetails>{};

  movies: Movie[] = [];
  movieCast: MovieCast[] = [];
  movieGenres: MovieGenre[] = [];

  backdropPathUrl = 'http://image.tmdb.org/t/p/original';
  profilePath = 'https://image.tmdb.org/t/p/w300/';

  page: number;
  movieId: number;
  totalPages: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private API: RequestService,
    private activatedRoute: ActivatedRoute,
    private urlParamsService: UrlParamsService,
  ) {
    this.urlParamsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
        .subscribe(params => {
          this.movieId = params['param'].movieId;
          this.page = params['queryParam'].page;

          this.getMovieCast();
          this.getMovieDetails();
          this.getRecommendationsMovies();
        });
  }

  ngOnInit(): void {
  }

  getMovieBackdrop(movieDetails: MovieDetails) {
    const backdropPath = movieDetails.backdrop_path;

    if (backdropPath == undefined) { return; }

    return `
      linear-gradient(rgba(0,0,0,.50) 0%, rgba(0,0,0,.50) 100%),
      url('${ this.backdropPathUrl }${ backdropPath }')
    `;
  }

  getMovieDetails() {
    this.API.getMovieDetailsByMovieId(this.movieId)
        .subscribe(res => {
          this.movieDetails = res;
          this.movieGenres = res.genres;
        });
  }

  getMovieCast() {
    this.API.getMovieCastByMovieId(this.movieId)
        .subscribe(res => {
          this.movieCast = res;
        });
  }

  getRecommendationsMovies() {
    this.API.getRecommendationsByMovieId(this.movieId, this.page)
        .subscribe(res => {
          this.page = res.page;
          this.movies = res.results;
          this.totalPages = res.total_pages;
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
      width: '560px',
      height: '315px',
      panelClass: 'custom-dialog',
      data: {
        movieId: this.movieDetails.id
      }
    });
  }

}
