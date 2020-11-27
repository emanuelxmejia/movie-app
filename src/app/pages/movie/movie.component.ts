import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { MovieDetails } from '../../shared/models/movie-details.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { MovieGenres } from '../../shared/models/movie-genres.model';
import { MatDialog } from '@angular/material/dialog';
import { MovieTrailerComponent } from '../../shared/components/dialogs/movie-trailer/movie-trailer.component';
import { MovieCast } from 'src/app/shared/models/movie-cast.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails = <MovieDetails>{};

  movies: Movie[] = [];
  movieGenres: MovieGenres[] = [];
  movieCast: MovieCast[] = [];

  backdropPathUrl = 'http://image.tmdb.org/t/p/original';
  profilePath = 'https://image.tmdb.org/t/p/w300/';

  movieId: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private API: RequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.movieId = params['movieId'];

      this.getMovieDetails(this.movieId);
      this.getRecommendationsByMovieId(this.movieId);
      this.getMovieCastByMovieId(this.movieId);
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

  getMovieDetails(movieId: number) {
    this.API.getMovieDetailsByMovieId(movieId)
        .subscribe(res => {
          console.log('movie details: ', res);
          this.movieDetails = res;
          this.movieGenres = res['genres'];
        });
  }

  getMovieCastByMovieId(movieId: number) {
    this.API.getMovieCastByMovieId(movieId)
        .subscribe(res => {
          console.log('movie creditos: ', res);
          this.movieCast = res;
        });
  }

  getRecommendationsByMovieId(movieId: number) {
    this.API.getRecommendationsByMovieId(movieId)
        .subscribe(res => {
          console.log('movies recomendadas: ', res);
          this.movies = res['results'];
        });
  }

  goToMovieGenre(movieGenre: MovieGenres) {
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

    dialogRef.afterClosed().subscribe(res => {
      console.log('dialog close');
    });
  }

}
