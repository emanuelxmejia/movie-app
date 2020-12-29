import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Movie }             from '../../shared/models/movie.model';
import { RequestService }    from '../../shared/services/request.service';
import { UrlParamsService }  from '../../shared/services/url-params.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: Movie[] = [];

  searchValue: string;

  page:       number;
  totalPages: number;

  loading = false;

  constructor(
    private API:              RequestService,
    private activatedRoute:   ActivatedRoute,
    private urlParamsService: UrlParamsService,
  ) {
    this.urlParamsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.searchValue = params['param'].searchValue;
        this.page        = params['queryParam'].page;

        this.searchMovie();
      });
  }

  ngOnInit(): void {
  }

  searchMovie() {
    this.loading = true;

    this.API.searchMovie(this.searchValue, this.page)
        .subscribe(res => {
          this.loading = false;

          this.page       = res.page;
          this.movies     = res.results;
          this.totalPages = res.total_pages;
        });
  }

}
