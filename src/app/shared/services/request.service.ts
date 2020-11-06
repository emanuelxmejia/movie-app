import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieGenres } from '../models/movie-genres.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  API_KEY = '06f88f2ab7f10fa2f43b90eef9805524';
  API_URL = 'https://api.themoviedb.org/3';

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
}
