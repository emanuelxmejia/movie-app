import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map }        from 'rxjs/operators';

import { MovieGenre }    from '../models/movie-genre.model';
import { MovieResponse } from '../models/movie.model';
import { MovieDetails }  from '../models/movie-details.model';
import { MovieTrailer }  from '../models/movie-trailer.model';
import { MovieCast }     from '../models/movie-cast.model';
import { Person }        from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private API_KEY = '06f88f2ab7f10fa2f43b90eef9805524';
  private API_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  public getMovieGenres(): Observable<MovieGenre[]> {
    const url = `${ this.API_URL }/genre/movie/list?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get(url)
          .pipe(map(res => res['genres']));
  }

  public getMoviesByCategoryName(categoryName: string, page: number = 1): Observable<MovieResponse> {
    const url = `${ this.API_URL }/movie/${ categoryName }?api_key=${ this.API_KEY }&language=en-US&page=${ page }`;

    return this.http.get<MovieResponse>(url);
  }

  public getMoviesByGenreId(genreId: number, page: number = 1): Observable<MovieResponse> {
    const url = `${ this.API_URL }/discover/movie?api_key=${ this.API_KEY }&language=en-US&page=${ page }&with_genres=${ genreId }`;

    return this.http.get<MovieResponse>(url);
  }

  public getMovieDetailsByMovieId(movieId: number): Observable<MovieDetails> {
    const url = `${ this.API_URL }/movie/${ movieId }?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get<MovieDetails>(url);
  }

  public getMovieCastByMovieId(movieId: number): Observable<MovieCast[]> {
    const url = `${ this.API_URL }/movie/${ movieId }/credits?api_key=${ this.API_KEY }`;

    return this.http.get<MovieCast>(url)
          .pipe(
            map(res => res['cast'])
          );
  }

  public getRecommendationsByMovieId(movieId: number, page: number = 1): Observable<MovieResponse> {
    const url = `${ this.API_URL }/movie/${ movieId }/recommendations?api_key=${ this.API_KEY }&language=en-US&page=${ page }`;

    return this.http.get<MovieResponse>(url);
  }

  public getMovieTrailerByMovieId(movieId: number): Observable<MovieTrailer[]> {
    const url = `${ this.API_URL }/movie/${ movieId }/videos?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get<MovieTrailer[]>(url)
          .pipe(
            map(res => res['results'])
          );
  }

  public getPersonDetailsByPersonId(personId: number): Observable<Person> {
    const url = `${ this.API_URL }/person/${ personId }?api_key=${ this.API_KEY }&language=en-US`;

    return this.http.get<Person>(url);
  }

  public getPersonMoviesByPersonId(personId: number, page: number = 1): Observable<MovieResponse> {
    const url = `${ this.API_URL }/discover/movie?api_key=${ this.API_KEY }&language=en-US&sort_by=popularity.desc&page=${ page }&with_people=${ personId }`;

    return this.http.get<MovieResponse>(url);
  }

  public searchMovie(searchValue: string, page: number = 1): Observable<MovieResponse> {
    const url = `${ this.API_URL }/search/movie?api_key=${ this.API_KEY }&language=en-US&query=${ searchValue }&page=${ page }`;

    return this.http.get<MovieResponse>(url);
  }
}
