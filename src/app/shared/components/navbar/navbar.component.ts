import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  makeNavbarFixed() {
    window.pageYOffset >= 100 ? this.isNavbarSticky = true : this.isNavbarSticky = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth >= 1025) { this.isOpenSearchBar = false; }
  }

  searchValue: string;

  isNavbarSticky: boolean;
  isOpenSearchBar = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendIsOpen() {
    this.sidebarService.sendIsMenuOpen(true);
  }

  goToSearch(searchValue: string) {
    console.log(searchValue);
    if (searchValue.length == 0) { return; }

    this.router.navigate(['/search', searchValue]);
    searchValue = '';
  }

}
