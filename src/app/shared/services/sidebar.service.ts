import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private subject = new Subject<boolean>();

  constructor() { }

  sendIsMenuOpen(isOpen: boolean) {
    this.subject.next(isOpen);
  }

  getIsMenuOpen() {
    return this.subject.asObservable();
  }

}
