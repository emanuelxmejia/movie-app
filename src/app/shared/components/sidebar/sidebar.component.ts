import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MovieGenres } from '../../models/movie-genres.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  movieGenres: MovieGenres[] = [];

  constructor(
    private API: RequestService
  ) { }

  ngOnInit() {
    this.getMovieGenres();
  }

  getMovieGenres() {
    this.API.getMovieGenres()
        .subscribe(res => {
          this.movieGenres = res;
        });
  }

}
