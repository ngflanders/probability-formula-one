import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultsComponent} from './results/results.component';
import {ResultsService} from '../Services/results.service';


@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ResultsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
