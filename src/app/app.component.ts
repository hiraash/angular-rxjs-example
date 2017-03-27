import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Array<string>;
  term: FormControl = new FormControl();
  limit: FormControl = new FormControl();

  constructor( wiki: WikipediaService ) {
    this.term.valueChanges
      .debounceTime( 500 )
      .distinctUntilChanged()
      .combineLatest( () => this.limit.valueChanges )
      .switchMap( values => wiki.search( values[0], values[1] ) )
      .subscribe( result => this.items = result );
  }

}
