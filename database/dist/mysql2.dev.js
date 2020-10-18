"use strict";

var mysql = require("mysql2");

var db2 = mysql.createPool({
  connectionLimit: 10,
  host: "ichigozcloud.tk",
  user: "maeteeps_fsync",
  password: "26042532",
  database: "maeteeps_provinces"
});
module.exports = db2;