import { Pipe, PipeTransform } from '@angular/core';
import { Movie }               from '../models/movie.model';

@Pipe({
  name: 'noMoviePoster'
})
export class NoMoviePosterPipe implements PipeTransform {

  transform(movie: Movie): string {
    const posterPath = 'https://image.tmdb.org/t/p/w300';

    if (movie.poster_path) {
      return posterPath + movie.poster_path;
    } else {
      if (movie.backdrop_path) {
        return posterPath + movie.backdrop_path;
      } else {
        return 'assets/images/no-movie-poster.png';
      }
    }
  }
}
