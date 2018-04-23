import {Injectable, OnInit, OnDestroy, OnChanges, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Paho} from 'ng2-mqtt';

@Injectable()
export class MqttService implements OnInit, OnDestroy, OnChanges {
  client: Paho.MQTT.Client;
  message: string;
  inklevel: number;
  isConnected: boolean = false;
  @Input() connectionStatus: string = "Not Connected";


  constructor() {
    this.client = new Paho.MQTT.Client("m13.cloudmqtt.com", 32939, 'clientid_' + Math.floor(Math.random() * 65535));
  }

  private onConnected(session): void {
    console.log('Connected to broker.');
    this.isConnected = true;
    this.connectionStatus = "Connected";
    this.client.subscribe("/printer", null);
  }

  status() {
    return this.connectionStatus;
  }

  connectToStream() {
    this.connectionStatus = "Connecting ...";
    var options = {
      useSSL: true,
      userName: "csxgueyq",
      password: "giiAUMdFENhp",
      onSuccess: this.onConnected.bind(this),
      onFailure: this.onFailure.bind(this),
    }
    if (!this.client.isConnected()) {
      this.client.connect(options);
      this.client.onConnectionLost = this.onConnectionLost.bind(this);
      this.client.onMessageArrived = this.onMessageArrived.bind(this);
    } else {
      console.log('Already connected !!');
    }
  }

  disconnect() {
    if (this.isConnected) {
      this.client.disconnect();
    }
    this.isConnected = false;
  }

  onFailure(err) {
    this.connectionStatus = "Unable to connect .."
    this.isConnected = false;
    this.connectToStream();
//    this.client.unsubscribe("/printer", null);
  }

  onConnectionLost() {
    this.connectionStatus = "Connection Lost.."
    this.isConnected = false;
//    this.client.unsubscribe("/printer", null);
    this.connectToStream();
  }

  onMessageArrived(message: Paho.MQTT.Message) {
    this.message = message.payloadString;
    this.inklevel = parseInt(((255 - parseInt(message.payloadString)) / 255 * 100).toFixed(0));
  }

  ngOnInit() {
    this.connectToStream();
  }

  ngOnDestroy() {
    this.client.disconnect()
    this.client = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.connectionStatus);
  }

}
