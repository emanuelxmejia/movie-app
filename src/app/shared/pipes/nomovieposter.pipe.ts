import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'nomovieposter'
})
export class NomovieposterPipe implements PipeTransform {

  transform(movie: Movie): string {
    const posterPath = 'http://image.tmdb.org/t/p/w500';

    if (movie.poster_path) {
      return posterPath + movie.poster_path;
    } else {
      if (movie.backdrop_path) {
        return posterPath + movie.backdrop_path;
      } else {
        return 'assets/images/no-movie-poster.png'
      }
    }
  }
}
