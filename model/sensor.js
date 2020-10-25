const mongoose = require("mongoose");
const SensorSchema = new mongoose.Schema({
    serial_number:Number,
    temp:Number,
    humi:Number,
    ec:Number,
    light:Number,
    pump_a:String,
    pump_b:String,
    pump_c:String,
    pump_d:String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", SensorSchema);
