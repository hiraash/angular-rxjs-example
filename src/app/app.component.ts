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

  constructor( wiki: WikipediaService ) {
    this.term.valueChanges
      .switchMap( val => wiki.search( val, 5 ) )
      .subscribe( result => this.items = result );
  }

}
