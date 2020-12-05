import { Component, HostListener, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  isNavbarSticky: boolean;
  isOpenSearchBar = false;

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  noWhiteSpacesValidator(formControl: FormControl) {
    const isWhiteSpace = (formControl.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;

    return isValid ? null : { 'whitespace': true };
  }

  createForm() {
    this.form = this.formBuilder.group({
      searchValue: ['', [
        Validators.required,
        Validators.minLength(2),
        this.noWhiteSpacesValidator
      ]]
    });
  }

  sendIsOpen() {
    this.sidebarService.sendIsMenuOpen(true);
  }

  goToSearch() {
    if (this.form.invalid) { return; }

    let searchValue: string;

    searchValue = this.form.value.searchValue;

    this.router.navigate(['/search', searchValue]);
    this.form.reset();
  }

}
