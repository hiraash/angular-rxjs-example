import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<Array<string>>;
  term = new FormControl();
  limit = new FormControl();

  constructor( private jsonp: Jsonp ) {
    this.items = this.term.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .combineLatest( this.limit.valueChanges )
        .switchMap( values => {
            const term = values[0], limit = values[1];
            const search = new URLSearchParams();
            search.set('action', 'opensearch');
            search.set('search', term);
            search.set('format', 'json');
            search.set('limit', limit);
            return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((response) => response.json()[1]);
            });
  }
}
