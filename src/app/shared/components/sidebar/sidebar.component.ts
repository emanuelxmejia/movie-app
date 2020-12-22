import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MovieGenre } from '../../models/movie-genre.model';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { GenreIdService } from '../../services/genre-id.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.elementRef.nativeElement.contains(event.target)) { this.isMenuOpen = false; }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth >= 1025) { this.isMenuOpen = false; }
  }

  movieGenres: MovieGenre[] = [];
  
  subscription: Subscription;
  
  isFixed: boolean;
  isMenuOpen: boolean;
  isMenuScroll: boolean;

  constructor(
    private API: RequestService,
    private elementRef: ElementRef,
    private genreService: GenreIdService,
    private sidebarSerice: SidebarService,
  ) {
    this.subscription = this.sidebarSerice.getIsMenuOpen().subscribe(data => {
      this.isMenuOpen = data;
    });
  }

  ngOnInit() {
    this.getMovieGenres();
  }

  sendGenreId(movieGenre: MovieGenre) {
    this.genreService.sendGenreId(movieGenre.id);
  }

  getMovieGenres() {
    this.API.getMovieGenres()
        .subscribe(res => {
          this.movieGenres = res;
        });
  }

}
