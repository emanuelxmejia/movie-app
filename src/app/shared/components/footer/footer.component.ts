import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() page: number;
  @Input() totalPages: number;

  currentPagePath: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // hacer un console.log para ver los eventos, puede servir para hacer los back
        this.currentPagePath = `/${ this.activatedRoute.snapshot.url[0].path }/${ this.activatedRoute.snapshot.url[1].path }`;
        console.log('current path: ', this.currentPagePath);
      }
    })
  }

  ngOnInit(): void {
  }

  goToNextPage() {
    this.page++;

    this.router.navigate([this.currentPagePath], { queryParams: { page: this.page } });
  }

  goToPreviousPage() {
    if (this.page == 1) { return; }

    this.page--;
    this.router.navigate([this.currentPagePath], { queryParams: { page: this.page } });
  }

}
