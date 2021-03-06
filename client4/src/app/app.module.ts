import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SpeechService } from './services/speech.service';
import { ApiService } from './services/api.service';
import { WindowRefService } from './services/window-ref.service';
//import { Window } from './interfaces/window';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap';
import { BenComponent } from './components/ben/ben.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule( {
    declarations: [
        AppComponent,
        BenComponent,
        SafeHtmlPipe,
        SafeUrlPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot()
    ],
    providers: [SpeechService, ApiService,
        { provide: Window, useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
