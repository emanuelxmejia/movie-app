import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService }         from '../../shared/services/request.service';
import { Movie }                  from '../../shared/models/movie.model';
import { UrlParamsService }       from '../../shared/services/url-params.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  movies: Movie[] = [];

  categoryName: string;

  page:       number;
  totalPages: number;

  loading = false;
 
  constructor(
    private router:           Router,
    private API:              RequestService,
    private activatedRoute:   ActivatedRoute,
    private urlParamsService: UrlParamsService,
  ) {
    this.urlParamsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.categoryName = params['param'].categoryName;
        this.page         = params['queryParam'].page;

        this.getMovies();
        this.getCategoryName(this.categoryName);
      });
  }

  ngOnInit(): void {
  }

  getMovies() {
    this.loading = true;

    this.API.getMoviesByCategoryName(this.categoryName, this.page)
      .subscribe(res => {
        this.loading = false;
  
        this.page       = res.page;
        this.movies     = res.results;
        this.totalPages = res.total_pages;
      },
      error => {
        if (error) {
          this.router.navigateByUrl('not-found');
        }
      });
  }

  getCategoryName(categoryName: string) {
    switch(categoryName) {
      case 'popular':
        this.categoryName = 'Popular';
        break;
      case 'top_rated':
        this.categoryName = 'Top Rated';
        break;
      case 'upcoming':
        this.categoryName = 'Upcoming';
        break;
      default: 'popular';
    }
  }
}
