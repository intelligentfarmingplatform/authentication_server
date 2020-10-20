"use strict";

/////mqtt
var mqtt = require('mqtt');

var MQTT_SERVER = "hairdresser.cloudmqtt.com";
var MQTT_PORT = "16232"; //if your server don't have username and password let blank.

var MQTT_USER = "kxefcxwq";
var MQTT_PASSWORD = "wjJqXIbP6G-C"; // Connect MQTT

var client = mqtt.connect({
  host: MQTT_SERVER,
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASSWORD
});
client.on('connect', function () {
  // Subscribe any topic
  console.log("MQTT Connect");
  client.subscribe('test', function (err) {
    if (err) {
      console.log(err);
    }
  });
}); // Receive Message and print on terminal

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});
setInterval(function () {
  client.publish("test", "hello from NodeJS");
}, 5000); /////