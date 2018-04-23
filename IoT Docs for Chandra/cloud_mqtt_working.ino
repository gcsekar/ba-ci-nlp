#include <ESP8266WiFi.h>
#include <PubSubClient.h>   // Read the rest of the article
#include <stdlib.h>
const int DHTPin = A0;
const int MOTIONPin = 4;
int sensor = 13;  // Digital pin D7
// Initialize DHT sensor.

// Temporary variables
static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];
//

const char *ssid =  "BravoChi";   // cannot be longer than 32 characters!
const char *pass =  "!Bravo$ourcing#";   //

const char *mqtt_server = "m13.cloudmqtt.com";
const int mqtt_port = 12939;
const char *mqtt_user = "csxgueyq";
const char *mqtt_pass = "giiAUMdFENhp";


const char *mqtt_client_name = "EspCLient"; // Client connections cant have the same connection name
#define BUFFER_SIZE 100
unsigned long previousMillis = 0;
const long interval = 10000;   
WiFiClient wclient;  //Declares a WifiClient Object using ESP8266WiFi
PubSubClient client(wclient, mqtt_server,  mqtt_port);  //instanciates client object
//Function is called when, a message is recieved in the MQTT server.
void callback(const MQTT::Publish& pub) {
Serial.print(pub.topic());
Serial.print(" => ");
 if (pub.has_stream()) {
    uint8_t buf[BUFFER_SIZE];
    int read;
    while (read = pub.payload_stream()->read(buf, BUFFER_SIZE)) {
      Serial.write(buf, read);
    }
    pub.payload_stream()->stop();
 
    //Check if the buffer is -1
    if(buf[0]=='-' && buf[1]=='1'){
    //Code to blink the LED -- its strange that I can't blink the LED for more than 1sec.
       digitalWrite(LED_BUILTIN, HIGH);
       delay(1000);
       digitalWrite(LED_BUILTIN, LOW);  
    }
     
    Serial.println("");
  }
Serial.println(pub.payload_string());
if(pub.payload_string()=="on"){
//Code to blink the LED -- its strange that I can't blink the LED for more than 1sec.
 digitalWrite(LED_BUILTIN, LOW);
 delay(4000);
Serial.println("led on");
}
if(pub.payload_string()=="off"){
//Code to blink the LED -- its strange that I can't blink the LED for more than 1sec.
 digitalWrite(LED_BUILTIN, HIGH);
 delay(4000);
Serial.println("led off");
}
}

void setup() {
// Setup console
Serial.begin(115200);  //set the baud rate
delay(10);
 
pinMode(MOTIONPin,INPUT);
pinMode(LED_BUILTIN, OUTPUT); 
 digitalWrite(LED_BUILTIN, LOW);
  delay(2000);                      // Wait for a second
  digitalWrite(LED_BUILTIN, HIGH);
Serial.println();
Serial.println();
}
void loop() {
if (WiFi.status() != WL_CONNECTED) {  //wifi not connected?
Serial.print("Connecting to ");
Serial.print(ssid);
Serial.println("...");
WiFi.begin(ssid, pass);
if (WiFi.waitForConnectResult() != WL_CONNECTED)
return;
Serial.println("WiFi connected");
}
if (WiFi.status() == WL_CONNECTED) {
//client object makes connection to server
if (!client.connected()) {
Serial.println("Connecting to MQTT server");
//Authenticating the client object
if (client.connect(MQTT::Connect("mqtt_client_name")
.set_auth(mqtt_user, mqtt_pass))) {
Serial.println("Connected to MQTT server");
//Subscribe code
client.set_callback(callback);
client.subscribe("/printer");
} else {
Serial.println("Could not connect to MQTT server");   
}
}
if (client.connected())
client.loop();
}

SendTempHumid();  // this will send the dummy temparature reading
}
// Non-Blocking delay



void SendTempHumid(){        
Serial.println("Potentiometer-sensor data");
uint8_t t = analogRead(DHTPin);
Serial.println(t);
delay(1000);
client.publish("/printer",String(t) );
}

