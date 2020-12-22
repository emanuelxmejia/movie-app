import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { Person } from '../../shared/models/person.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { UrlParamsService } from '../../shared/services/url-params.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = <Person>{};

  movies: Movie[] = [];

  page: number;
  personId: number;
  totalPages: number;

  constructor(
    private API: RequestService,
    private paramsService: UrlParamsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.personId = params['param'].personId;
        this.page = params['queryParam'].page;

        this.getPersonDetails();
        this.getPersonMovies();
      });
  }
  
  ngOnInit(): void {
  }

  getPersonDetails() {
    this.API.getPersonDetailsByPersonId(this.personId)
        .subscribe(res => {
          this.person = res;
        });
  }

  getPersonMovies() {
    this.API.getPersonMoviesByPersonId(this.personId, this.page)
        .subscribe(res => {
          this.page = res.page;
          this.movies = res.results;
          this.totalPages = res.total_pages;
        });
  }

}
