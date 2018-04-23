import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BenComponent} from '../ben/ben.component';
import {IotComponent} from '../iot/iot.component'

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  @ViewChild('ben') ben: BenComponent;
  @ViewChild('iot') iot: IotComponent;
  constructor() {}

  ngOnInit() {
  }

  showBen() {
    this.ben.showModal();
  }
  
  showIot(){
    this.iot.showModal();
  }
}
