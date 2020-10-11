const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "item",
});

module.exports = db;
