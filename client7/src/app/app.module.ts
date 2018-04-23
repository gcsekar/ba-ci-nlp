import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {NgxGaugeModule} from 'ngx-gauge';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';

import {SpeechService} from './services/speech/speech.service';
import {ApiService} from './services/api/api.service';
import {WindowRefService} from './services/window/window-ref.service';
import {PoService} from './services/po/po.service';
import {MqttService} from './services/mqtt/mqtt.service';
import {SciquestService} from './services/sciquest/sciquest.service';

import {AppComponent} from './app.component';
import {ModalModule} from 'ngx-bootstrap';
import {BenComponent} from './components/ben/ben.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import {DashboardDirective} from './directives/dashboard.directive';
import {FeaturesComponent} from './components/features/features.component';
import {IotComponent} from './components/iot/iot.component';


@NgModule({
  declarations: [
    AppComponent,
    BenComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    DashboardDirective,
    FeaturesComponent,
    IotComponent,
    GoogleChart
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxGaugeModule,
    ModalModule.forRoot()
  ],
  providers: [
    SpeechService,
    ApiService,
    PoService, 
    MqttService,
    SciquestService,
    {provide: Window, useValue: window}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
