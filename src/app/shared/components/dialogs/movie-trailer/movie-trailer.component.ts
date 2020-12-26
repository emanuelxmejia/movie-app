import { Component, Inject, OnInit }     from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService }                from '../../../services/request.service';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent implements OnInit {

  youtubeUrl = 'https://www.youtube.com/embed/';
  videoUrl: string;

  movieId: number;

  constructor(
    private API:      RequestService,
    public dialogRef: MatDialogRef<MovieTrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {
    this.movieId = data['movieId'];
    this.getMovieTrailer(this.movieId);
  }

  ngOnInit(): void {
  }

  getMovieTrailer(movieId: number) {
    this.API.getMovieTrailerByMovieId(movieId)
        .subscribe(res => {
          return this.videoUrl = this.youtubeUrl + res[0].key;
        });
  }

}
