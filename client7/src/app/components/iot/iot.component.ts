import {Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {MqttService} from '../../services/mqtt/mqtt.service';
import {PoService} from '../../services/po/po.service';
import {SciquestService} from '../../services/sciquest/sciquest.service';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class IotComponent implements OnInit, OnChanges {
  @ViewChild('iotModal') public iotModal: ModalDirective;
  @Input() connectionState: boolean;
  timer_id;
  warn = "";
  reorderMessage = ""
  previous_val: number = 0;
  resp;

  gaugeType = "arch";
  gaugeValue = 28.3;
  gaugeLabel = "Ink Level";
  gaugeAppendText = "%";
  gaugeMin = 0;
  gaugeMax = 100;
  gaugeCap = "butt"
  gaugeThick = 15;
  gaugeThreshold = {
    '10': {color: 'red'},
    '30': {color: 'orange'},
    '60': {color: 'green'}
  };
  gaugeSize = 400;

  gauge_ChartData = [
    ['Label', 'Ink Level'],
    ['%', 50]];

  gauge_ChartOptions = {
    width: 400, height: 400,
    redFrom: 0, redTo: 30,
    yellowFrom: 31, yellowTo: 45,
    minorTicks: 5
  }
  constructor(private mqtt: MqttService, private po: PoService, private sciquest: SciquestService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.connect()
  }

  ngOnDestroy() {
    this.disconnect();
  }
  showModal() {
    this.iotModal.show();
  }

  status() {
    return (this.mqtt.isConnected && this.mqtt.inklevel);
  }

  connect() {
    this.mqtt.connectToStream();
    this.timer_id = setTimeout(this.updateValue.bind(this), 1000)
  }

  disconnect() {
    this.mqtt.disconnect();
    clearTimeout(this.timer_id)
  }

  ngOnChanges(changes: SimpleChanges) {
    //    console.log(changes);
  }

  isSciquestConnected() {
    try {
      let retVal = this.sciquest.checkConnection();
      return retVal;
    }
    catch (e) {
      return false
    };
  }

  triggerPO() {
    try {
      if (this.isSciquestConnected()) {
        this.po.sendXML().subscribe(
          resp => {
            this.resp = resp;
            this.warn = 'Printer cartridge running low.';
            this.reorderMessage = "Purchase order " + this.resp.text() + " for replacement cartridge submitted for approval !!";
          },
          error => console.log(error),
          () => console.log(this.resp.text())
        );
      } else {
        this.warn = 'Printer cartridge running low.';
        this.reorderMessage = "Purchase order for replacement cartridge submitted for approval !!";

      }

    } catch (e) {
      console.log(e);
    }
  }
  updateValue() {
    if (this.previous_val > 30 && this.mqtt.inklevel <= 30) { //this.previous_val > this.mqtt.inklevel && 
      this.triggerPO();
    }
    if (this.mqtt.inklevel > 30) {
      this.warn = "";
    }
    //    console.log(this.previous_val + " - " + this.mqtt.inklevel);
    this.previous_val = this.mqtt.inklevel;
    this.gauge_ChartData = [
      ['Label', 'Ink Level'],
      ['%', this.mqtt.inklevel ? this.mqtt.inklevel : 50]];
    //    this.gauge_ChartData[1][1] = this.mqtt.inklevel;
    this.cd.detectChanges();
    this.timer_id = setTimeout(this.updateValue.bind(this), 1000)
  }
}
