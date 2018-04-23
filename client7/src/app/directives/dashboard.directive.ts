import {Directive, OnInit, AfterViewInit, ElementRef, Input} from '@angular/core';

import {Window} from '../interfaces/window';

@Directive({
  selector: '[app-dashboard]'
})
export class DashboardDirective implements OnInit, AfterViewInit {
  dashboardRef: string = '';
  constructor(private el: ElementRef) {}
  @Input('url') url: string;
  ngOnInit() {
    console.log("OnInit")
  }

  ngAfterViewInit() {
//    this.dashboardRef = 
    this.showDashboard(this.url);
  }

  showDashboard(dashboardUrl: string) {
      this.dashboardRef = this.url;
//    this.dashboardRef = dashboardUrl
    //        this.childModal.show()
    //        window.open(dashboardUrl,'popup','width=1200,height=800');
    this.PopupCenter(dashboardUrl, "Dashboard", 1300, 800);

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
}
