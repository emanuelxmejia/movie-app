import { Injectable }                from '@angular/core';
import { Params }                    from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, debounceTime }         from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  private urlParams$: Observable<Params>;

  constructor() { }

  public getUrlParams(param: Observable<Params>, queryParam: Observable<Params>) {
    this.urlParams$ = combineLatest([param, queryParam])
      .pipe(
        map(params => ({ param: params[0], queryParam: params[1] })),
        debounceTime(0)
      );

    return this.urlParams$;
  }
}
