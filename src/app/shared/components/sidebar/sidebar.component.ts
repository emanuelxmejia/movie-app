import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MovieGenres } from '../../models/movie-genres.model';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';

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
  onResize(event: Event) {
    if (window.innerWidth >= 1025) { this.isMenuOpen = false; }
    this.addScrollToMenu();
  }

  @HostListener('window:scroll', ['$event']) 
  doSomething(event: Event) {
    window.pageYOffset >= 300 ? this.isFixed = true : this.isFixed = false;
  }

  movieGenres: MovieGenres[] = [];
  
  subscription: Subscription;
  
  isFixed: boolean;
  isMenuOpen: boolean;
  isMenuScroll: boolean;

  constructor(
    private API: RequestService,
    private elementRef: ElementRef,
    private sidebarSerice: SidebarService,
  ) {
    this.subscription = this.sidebarSerice.getIsMenuOpen().subscribe(data => {
      this.isMenuOpen = data;
    });

    this.addScrollToMenu();
  }

  ngOnInit() {
    this.getMovieGenres();
  }

  getMovieGenres() {
    this.API.getMovieGenres()
        .subscribe(res => {
          this.movieGenres = res;
        });
  }

  addScrollToMenu() {
    // if (window.innerHeight <= 619) {
    //   console.log('estas en una pantalla de 619 o menor');
    //   this.isMenuScroll = true;
    // } else {
    //   console.log('estas en una pantalla mas grande de 619');
    //   this.isMenuScroll = false;
    // }

    window.innerHeight <= 750 ? this.isMenuScroll = true : this.isMenuScroll = false;
  }

}
