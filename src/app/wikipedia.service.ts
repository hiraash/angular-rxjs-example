import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class WikipediaService {
  constructor( private jsonp: Jsonp ) {}

  search ( term, limit ): Observable<any> {
      console.log( 'Searching Wikipedia for ' + term );
      const search = new URLSearchParams();
      search.set('action', 'opensearch');
      search.set('search', term);
      search.set('format', 'json');
      search.set('limit', limit );
      return this.jsonp
          .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
          .map((response) => response.json()[1]);
  }

}
