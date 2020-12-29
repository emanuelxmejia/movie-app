import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { forkJoin }          from 'rxjs';
import { Movie }             from '../../shared/models/movie.model';
import { Person }            from '../../shared/models/person.model';
import { RequestService }    from '../../shared/services/request.service';
import { UrlParamsService }  from '../../shared/services/url-params.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = <Person>{};

  movies: Movie[] = [];

  page:       number;
  personId:   number;
  totalPages: number;

  loading = false;

  constructor(
    private API:            RequestService,
    private location:       Location,
    private paramsService:  UrlParamsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsService.getUrlParams(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(params => {
        this.personId = params['param'].personId;
        this.page     = params['queryParam'].page;

        this.getPersonInformation();
      });
  }
  
  ngOnInit(): void {
  }

  getPersonInformation() {
    this.loading = true;

    const personDetails = this.API.getPersonDetailsByPersonId(this.personId);
    const personMovies  = this.API.getPersonMoviesByPersonId(this.personId, this.page);

    forkJoin([personDetails, personMovies]).subscribe(res => {
      this.loading = false;

      this.person     = res[0];
      this.page       = res[1].page;
      this.movies     = res[1].results;
      this.totalPages = res[1].total_pages;
    });
  }

  back() {
    this.location.back();
  }

}
