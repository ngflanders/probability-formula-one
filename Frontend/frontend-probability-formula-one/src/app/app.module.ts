import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultsComponent} from './results/results.component';
import {FormulaoneInfoService} from "../Services/formulaone-info.service";
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ResultsComponent
  ],
  providers: [FormulaoneInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
