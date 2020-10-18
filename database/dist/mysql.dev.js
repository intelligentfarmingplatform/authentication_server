"use strict";

var mysql = require("mysql2");

var db = mysql.createPool({
  connectionLimit: 10,
  host: "ichigozcloud.tk",
  user: "maeteeps_fsync",
  password: "26042532",
  database: "maeteep_fsync"
});
module.exports = db;