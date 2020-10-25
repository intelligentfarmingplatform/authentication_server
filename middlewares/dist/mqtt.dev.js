"use strict";

var Sensor = require("../model/sensor"); /////mqtt


var mqtt = require('mqtt');

var MQTT_SERVER = "hairdresser.cloudmqtt.com";
var MQTT_PORT = "16232"; //if your server don't have username and password let blank.

var MQTT_USER = "kxefcxwq";
var MQTT_PASSWORD = "wjJqXIbP6G-C";
var topic_list = ["/pumpA/status/", "/pumpB/status/", "/pumpC/status/", "/pumpD/status/", "sh/ig/pir"];
var pumpA = 'eiei';
var pumpB;
var pumpC;
var pumpD; // Connect MQTT

var client = mqtt.connect({
  host: MQTT_SERVER,
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASSWORD
});
client.on('connect', function () {
  // Subscribe any topic
  console.log("MQTT Connect");
  client.subscribe(topic_list);
});
client.on('message', function (topic, message) {
  // message is Buffer
  //console.log(message.toString());
  if (topic === 'sh/ig/pir') {
    console.log('From pir: ', message.toString());
  }

  if (topic === '/pumpA/status/') {
    console.log('Pump A is: ', message.toString());
  }

  if (topic === '/pumpB/status/') {
    console.log('Pump B is: ', message.toString());
  }

  if (topic === '/pumpC/status/') {
    console.log('Pump C is: ', message.toString());
  }

  if (topic === '/pumpD/status/') {
    console.log('Pump D is: ', message.toString());
  }
}); // Receive Message and print on terminal
// client.on('message', function (topic, message) {
//     // message is Buffer
//     //console.log(message.toString());
//     this.sensor=message.toString()
//     if(this.sensor=='On'){
//         console.log("Pump is ON!")
//         return sensor
//     }if(this.sensor=='Off'){
//         console.log("Pump is OFF!")
//     }
// });
// setInterval(() => {
//     client.publish("test", "hello from NodeJS");
// }, 5000);
/////

module.exports = pumpA, pumpB, pumpC, pumpD;