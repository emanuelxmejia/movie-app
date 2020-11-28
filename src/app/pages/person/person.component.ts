import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { Person } from '../../shared/models/person.model';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = <Person>{};

  movies: Movie[] = [];

  personId: number;

  constructor(
    private API: RequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.personId = params['personId'];
    });
  }
  
  ngOnInit(): void {
    this.getPersonDetails();
    this.getPersonMovies();
  }

  getPersonDetails() {
    this.API.getPersonDetailsByPersonId(this.personId)
        .subscribe(res => {
          this.person = res;
          console.log(this.person);
        });
  }

  getPersonMovies() {
    this.API.getPersonMoviesByPersonId(this.personId)
        .subscribe(res => {
          this.movies = res['results'];
        });
  }

}
