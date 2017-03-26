import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<Array<string>>;
  term = new FormControl();

  constructor( private jsonp: Jsonp ) {

  }

  ngOnInit(){
    this.items = this.term.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => {
          var search = new URLSearchParams()
          search.set('action', 'opensearch');
          search.set('search', term);
          search.set('format', 'json');
          return this.jsonp
              .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
              .map((response) => response.json()[1]);
        });
  }
}
