import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WikipediaService } from './wikipedia.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    JsonpModule
  ],
  providers: [ WikipediaService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
