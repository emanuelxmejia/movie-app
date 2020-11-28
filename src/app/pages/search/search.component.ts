import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchValue: string;

  constructor(
    private API: RequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.searchValue = params['searchValue'];

      this.searchMovie();
    });

  }

  ngOnInit(): void {
  }

  searchMovie() {
    this.API.searchMovie(this.searchValue)
        .subscribe(res => {
          console.log(res);
        });

  }

}
