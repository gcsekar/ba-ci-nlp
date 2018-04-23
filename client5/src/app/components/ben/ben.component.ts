import { Component, OnInit, OnDestroy, Input, Output, OnChanges, AfterViewChecked, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { NgModel } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
//import { DomSanitizer } from '@angular/platform-browser';
import { Window } from '../../interfaces/window';

import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
var MESSAGE_TYPE = {
    BEN: 0,
    USER: 1
};

var MESSAGE = {
    messageId: String,
    messageType: MESSAGE_TYPE,
    message: String,
    url: String,
    embed: Boolean,
    embed_code: String,
    iframe: Boolean,
    dashboard: String,
    relevance: String
};

declare var tableau: any;
declare var SpeechSynthesisUtterance: any;
declare var speechSynthesis: any;
@Component( {
    selector: 'app-ben',
    templateUrl: './ben.component.html',
    styleUrls: ['./ben.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [
        trigger( "messageState", [
            state( 'in', style( {
                opacity: 1
                //                , transform: 'translateX(0)' 
            }) ),
            transition( 'void => *', [
                style( {
                    opacity: 0,
                    //                    transform: 'translateX(-100%)'
                }),
                animate( '0.5s ease-in' )
            ] )
        ] ),
        trigger( "visualization", [
            state( 'in', style( {
                opacity: 1,
                //                transform: 'translateX(0)' 
            }) ),
            transition( 'void => *', [
                style( {
                    opacity: 0,
                    //                    transform: 'translateX(-100%)'
                }),
                animate( '1.5s ease-in' )
            ] )
        ] )
    ]
})
export class BenComponent implements OnInit {
    @ViewChild( 'chatContainer' ) private chatContainer: ElementRef;
    @ViewChild( 'chat' ) private chatDiv: ElementRef;
    @ViewChild( 'questionTextCtrl' ) private questionTextCtrl: ElementRef;
    @ViewChild('childModal') public childModal:ModalDirective;
    
    
    micVisible: boolean;
    startlistening: boolean;
    questionText: string;
    listening: boolean;
    welcomeMessage: string;
    @Output() messages = [];
    tableauViz: any;
    benTalk: boolean = true;
    dashboardRef: string = '';

    constructor( private speechService: SpeechService, private nlp: ApiService, private cd: ChangeDetectorRef ) {
        this.micVisible = false;
        this.questionText = "";
        this.listening = false;
        this.welcomeMessage = "Hello ! I am BEN. How can I help you today ?";
        //        this.nlp = new ApiService();
    }

    ngOnInit() {
        this.initmic();
        this.addMessage( MESSAGE_TYPE.BEN, this.welcomeMessage, true );
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this.speechService.DestroySpeechObject();
    }

    initmic() {
        if ( window.hasOwnProperty( 'webkitSpeechRecognition' ) ) {
            this.micVisible = true;
        }
        else {
            this.micVisible = false;
        }
        if ( this.micVisible ) {
            this.welcomeMessage += "\n You can click on the microphone icon and ask your question too !"
        }
    }

    listen(): void {
        if ( this.micVisible ) {
            this.listening = true;
            this.questionText = "";
            this.speechService.record()
                .subscribe(
                //listener
                ( value ) => {
                    this.questionText = value;
                },

                //error
                ( err ) => {
                    console.log( err );
                    if ( err.error == "no-speech" ) {
                        console.log( "--restarting service--" );
                        this.listen();
                    }
                },

                //completion
                () => {
                    this.listening = false;
                    this.benTalk = true;
                    this.ask();
                }
                );
        }
    }

    addMessage( messageType: any, message: string, nospeak: boolean = true ) {
        var x: any = {};
        x.messageId = this.guid();
        x.messageType = messageType;
        if ( message.match( "<div" ) ) {
            x.embed = true;
            x.iframe = false
            x.message = "This is what I found ...";
            //            var sanitize = this.sanitizer.bypassSecurityTrustHtml( message );
            try {

                var data = eval( "({" + message + "})" );
                x.embed_code = data.url;
                x.dashboard = data.dashboard;
                x.relevance = data.relevance;
            }
            catch ( e ) {
                x.embed_code = message
                x.dashboard = "";
                x.relevance = "";
            }
        }
        else if ( message.match( "https://" ) ) {
            x.embed = false;
            x.iframe = true;
            x.message = "This is what I found ...";
            try {
                var data = eval( "({" + message + "})" );
                x.embed_code = data.url;
                x.dashboard = data.dashboard;
                x.relevance = data.relevance;
            }
            catch ( e ) {
                x.embed_code = message
                x.dashboard = "";
                x.relevance = "";
                x.dashboard = "";
                x.relevance = "";
            }
        }
        else {
            x.message = message;
            x.embed = false;
            x.iframe = false;
            x.embed_code = "";
        }
        if ( messageType == MESSAGE_TYPE.BEN ) {
            x.url = "https://api.randomuser.me/portraits/med/men/64.jpg";
            if ( !nospeak ) {
                this.speak( x.message );
            }
        }
        else {
            x.url = "https://dummyimage.com/64/ff9900/0011ff.png&text=You"
        }
        console.log( x );
        this.messages.push( x );
        this.scrollToBottom();
        this.cd.detectChanges();

    }

    isBen( message ) {
        return ( message.messageType == MESSAGE_TYPE.BEN )
    }

    isDashboardAvailable( message ) {
        var retVal: boolean = false;
        if ( message.dashboard ) {
            if ( message.dashboard != "" ) {
                retVal = true;
            }
        }
        return retVal;
    }

    PopupCenter(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : 0;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : 0;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    }

    showDashboard(dashboardUrl: string) {
        this.dashboardRef =  dashboardUrl
//        this.childModal.show()
//        window.open(dashboardUrl,'popup','width=1200,height=800');
        this.PopupCenter(dashboardUrl,"Dashboard",1300,800);
        
    }

    hideDashboard(){
        this.dashboardRef='';
        this.childModal.hide();
    }
    askButtonClick(){
        this.benTalk = false;
        this.ask();
        
    }
    
    ask() {
        var response: string = "";
        var promise: any;
        if ( this.questionText != "" ) {
            this.addMessage( MESSAGE_TYPE.USER, this.questionText );
            this.nlp.ask( this.questionText )
                .then( res => {
                    this.processResponse( res );
                })
                .catch( err => { console.log( err ) });
            this.questionText = "";
//            this.benTalk = false;
        }
    }

    processResponse( response: any ) {
        if ( response.status.code == 200 ) {
            this.addMessage( MESSAGE_TYPE.BEN, response.result.fulfillment.speech, false );
        } else {
            this.addMessage( MESSAGE_TYPE.BEN, "I am having trouble processing your response. Please try again." )
        }
    }
    scrollToBottom(): void {
        try {
            //            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
            var height = $( "div.chat" )[0].scrollHeight
            //          $("div,chat")[0].animate({ scrollTop: height}, 1000, function(){});
            $( "div.chat" )[0].scrollTop = height
        }
        catch ( err ) { }
    }

    guid() {
        function s4() {
            return Math.floor(( 1 + Math.random() ) * 0x10000 )
                .toString( 16 )
                .substring( 1 );
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    //    showViz( message ) {
    //        var theView = document.getElementById( message.messageId ).getElementsByClassName( "embed-container" )[0];
    //        //        var options = {
    //        //            hideTabs: true,
    //        //            width: '600px',
    //        //            height: '400px',
    //        //            onFirstInteractive: function() {
    //        //                // The viz is now ready and can be safely used.
    //        //            };
    //        var viz: any = new tableau.Viz( theView, message.embed_code.changingThisBreaksApplicationSecurity, { hideTabs: true, width: '600px', height: '400px' })
    //    };

    speak( say ): void {
        if ( this.benTalk ) {
            if ( 'speechSynthesis' in window ) {
                var utterance = new SpeechSynthesisUtterance( say );
                speechSynthesis.speak( utterance );
            }
        }
    }

    toggleVoice(): void {
        this.benTalk = !this.benTalk;
    }

}
