import { Component, Input, OnInit } from '@angular/core';
import { Router }                   from '@angular/router';
import { Movie }                    from '../../models/movie.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() movies:  Movie[];
  @Input() loading: boolean;

  cardsLoading = Array(20);

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToMovieDetails(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

}
