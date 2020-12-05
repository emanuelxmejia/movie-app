import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';
import { Movie } from '../../shared/models/movie.model';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  movies: Movie[] = [];

  categoryName: string;

  constructor(
    private router: Router,
    private API: RequestService,
    private activateRoute: ActivatedRoute,
  ) {
    this.activateRoute.params.subscribe(params => {
      this.categoryName = params['categoryName'];

      this.getMoviesByCategoryName(this.categoryName);
      this.getCategoryName(this.categoryName);
    })
  }

  ngOnInit() {
  }

  getMoviesByCategoryName(categoryName: string) {
    this.API.getMoviesByCategoryName(categoryName)
      .subscribe(res => {
        this.movies = res['results'];
        console.log('movies from browse: ', this.movies);
      },
      error => {
        if (error.status == 404) {
          this.router.navigateByUrl('not-found');
        }
      });
  }

  getCategoryName(categoryName) {
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
      default: 'Popular';
    }
  }
}
