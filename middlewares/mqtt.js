/////mqtt
var mqtt = require('mqtt');

const MQTT_SERVER = "hairdresser.cloudmqtt.com";
const MQTT_PORT = "16232";
//if your server don't have username and password let blank.
const MQTT_USER = "kxefcxwq"; 
const MQTT_PASSWORD = "wjJqXIbP6G-C";

sensor='';
// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('/pump/status/', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    //console.log(message.toString());
    this.sensor=message.toString()
    if(this.sensor=='On'){
        console.log("Pump is ON!")
    }if(this.sensor=='Off'){
        console.log("Pump is OFF!")
    }
});

// setInterval(() => {
//     client.publish("test", "hello from NodeJS");
// }, 5000);
/////
module.exports = sensor