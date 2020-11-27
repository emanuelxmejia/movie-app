import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieGenres } from '../models/movie-genres.model';
import { Movie } from '../models/movie.model';
import { MovieDetails } from '../models/movie-details.model';
import { MovieTrailer } from '../models/movie-trailer.model';
import { MovieCast } from '../models/movie-cast.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private API_KEY = '06f88f2ab7f10fa2f43b90eef9805524';
  private API_URL = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient
  ) { }

  getMovieGenres(): Observable<MovieGenres[]> {
    const url = `${ this.API_URL }/genre/movie/list?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get(url)
          .pipe(map(res => res['genres']));
  }

  getMoviesByCategoryName(categoryName: string): Observable<Movie[]> {
    const url = `${ this.API_URL }/movie/${ categoryName }?api_key=${ this.API_KEY }&language=en-US&page=1`;

    return this.http.get<Movie[]>(url);
  }

  getMoviesByGenreId(genreId: number): Observable<Movie[]> {
    const url = `${ this.API_URL }/discover/movie?api_key=${ this.API_KEY }&language=en-US&page=1&with_genres=${ genreId }`;

    return this.http.get<Movie[]>(url);
  }

  getMovieDetailsByMovieId(movieId: number): Observable<MovieDetails> {
    const url = `${ this.API_URL }/movie/${ movieId }?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get<MovieDetails>(url);
  }

  getMovieCastByMovieId(movieId: number): Observable<MovieCast[]> {
    const url = `${ this.API_URL }/movie/${ movieId }/credits?api_key=${ this.API_KEY }`;

    return this.http.get<MovieCast>(url)
          .pipe(
            map(res => res['cast'])
          );
  }

  getRecommendationsByMovieId(movieId: number): Observable<Movie[]> {
    const url = `${ this.API_URL }/movie/${ movieId }/recommendations?api_key=${ this.API_KEY }&language=en-US&page=1`;

    return this.http.get<Movie[]>(url);
  }

  getMovieTrailerByMovieId(movieId: number): Observable<MovieTrailer[]> {
    const url = `${ this.API_URL }/movie/${ movieId }/videos?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get<MovieTrailer[]>(url)
          .pipe(
            map(res => res['results'])
          );
  }
}
