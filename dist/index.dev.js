"use strict";

var express = require("express");

var morgan = require("morgan");

var app = express();

var dotenv = require("dotenv");

var mongoose = require("mongoose");

var db2 = require("./database/mysql2");

var cors = require("cors");

var helmet = require("helmet");

var session = require("express-session");

app.set("trust proxy", 1); // trust first proxy

app.use(session({
  secret: "s3Cur3",
  name: "sessionId",
  resave: true,
  saveUninitialized: true
}));
app.use(helmet()); //Import Routes

var authRoute = require("./routes/auth");

var postRoute = require("./routes/posts");

var meRoute = require("./routes/me");

var userlistsRoute = require("./routes/userlists");

var userprofileRoute = require("./routes/userprofile");

var provincesRoute = require("./routes/provinces");

var amphuresRoute = require("./routes/amphures");

var districtsRoute = require("./routes/districts");

var myproductsRoute = require("./routes/myproducts");

dotenv.config();
db2.query("SELECT * FROM `testconnection`", function (err) {
  if (err) return console.log("Failed to mysql DB !!");
  console.log("Connected to mysql DB !!");
}); //connect to mongo db

mongoose.connect(process.env.MONGO_DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}, function () {
  return console.log("Connected to MongoDB !!");
});
app.use(cors()); //Middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //Route Middleware

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/me", meRoute);
app.use("/api/userlists", userlistsRoute);
app.use("/api/userprofile", userprofileRoute);
app.use("/api/provinces", provincesRoute);
app.use("/api/amphures", amphuresRoute);
app.use("/api/districts", districtsRoute);
app.use("/api/myproducts", myproductsRoute);

var productRoute = require("./routes/product");

var categoryRoute = require("./routes/category");

var ownerRoute = require("./routes/owner");

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", ownerRoute);
app.listen(process.env.PORT, function () {
  return console.log("Server is running on :", process.env.PORT);
});