import { Pipe, PipeTransform } from '@angular/core';
import { Person }              from '../models/person.model';

@Pipe({
  name: 'noPersonPicture'
})
export class NoPersonPicturePipe implements PipeTransform {

  transform(person: Person): string {
    const picturePath = 'https://image.tmdb.org/t/p/original';

    if (person.profile_path) {
      return picturePath + person.profile_path;
    } else {
      return person.gender == 1 ? 'assets/images/no-female-picture.jpg' : 'assets/images/no-male-picture.png';
    }
  }

}
