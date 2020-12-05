import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { MovieGenres } from '../../shared/models/movie-genres.model';
import { Movie } from '../../shared/models/movie.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  movies: Movie[] = [];

  genreName: string;

  genreId: number;

  constructor(
    private API: RequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.genreName = params['genreName'];
      this.getMovieGenresNames();
    });
  }

  ngOnInit() {
  }

  getMovieGenresNames() {
    this.API.getMovieGenres()
        .subscribe(res => {
          res.forEach(movieGenre => {
            if (this.genreName == movieGenre.name) {
              this.genreId = movieGenre.id;
              this.getMovies();
            }
          });
        });
  }

  getMovies() {
    this.API.getMoviesByGenreId(this.genreId)
      .subscribe(res => {
        this.movies = res['results'];
        console.log('movies from genre: ', this.movies);
      });
  }

}
