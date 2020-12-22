import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreIdService {

  private subject = new BehaviorSubject<number>(0);

  constructor() {
    const storedGenreId = localStorage.getItem('genreId');

    if (storedGenreId) { this.sendGenreId(JSON.parse(storedGenreId)); }
  }

  public sendGenreId(genreId: number) {
    localStorage.setItem('genreId', JSON.stringify(genreId));
    this.subject.next(genreId);
  }

  public getGenreId() {
    return this.subject.asObservable();
  }
}
