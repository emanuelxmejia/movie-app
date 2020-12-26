import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs';
import { Movie }                        from '../../shared/models/movie.model';
import { RequestService }               from '../../shared/services/request.service';
import { GenreIdService }               from '../../shared/services/genre-id.service';
import { UrlParamsService }             from '../../shared/services/url-params.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];

  genreName: string;

  page:       number;
  genreId:    number;
  totalPages: number;

  subscription: Subscription;

  constructor(
    private API:              RequestService,
    private genreService:     GenreIdService,
    private activatedRoute:   ActivatedRoute,
    private urlParamsService: UrlParamsService,
  ) {
    this.subscription = this.genreService.getGenreId().subscribe(data => {
      this.genreId = data;
    });

    this.urlParamsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.genreName = params['param'].genreName;
        this.page      = params['queryParam'].page;

        this.getMovies();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMovies() {
    this.API.getMoviesByGenreId(this.genreId, this.page)
      .subscribe(res => {
        this.page       = res.page;
        this.movies     = res.results;
        this.totalPages = res.total_pages
      });
  }

}
