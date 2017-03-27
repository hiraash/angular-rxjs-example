import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { WikipediaService } from './wikipedia.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  items: Observable<Array<string>>;
  term = new FormControl();
  limit = new FormControl();

  constructor( private wiki: WikipediaService ) {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .combineLatest( this.limit.valueChanges )
      .switchMap( values =>  wiki.search( values[0], values[1] ) );
  }

  ngAfterViewInit() {
    this.limit.setValue( 10 );
  }
}
