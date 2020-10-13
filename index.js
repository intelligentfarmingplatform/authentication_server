const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const db = require("./database/mysql")
const cors = require("cors");
var helmet = require('helmet')
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true,
}))
app.use(helmet())
//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const meRoute = require("./routes/me");
const userlistsRoute = require("./routes/userlists");
const userprofileRoute = require("./routes/userprofile");
const provincesRoute = require("./routes/provinces");
const amphuresRoute = require("./routes/amphures");
const districtsRoute = require("./routes/districts");
dotenv.config();

db.query(
  'SELECT * FROM `testconnection`',
  err => {
    if (err) return console.log(`Failed to mysql DB !!`);

    console.log(`Connected to mysql DB !!`);
    
  },
);



//connect to mongo db
mongoose.connect(
  process.env.MONGO_DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB !!")
);

app.use(cors());
//Middleware
app.use(express.json());

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/me", meRoute);
app.use("/api/userlists", userlistsRoute);
app.use("/api/userprofile", userprofileRoute);
app.use("/api/provinces", provincesRoute);
app.use("/api/amphures", amphuresRoute);
app.use("/api/districts", districtsRoute);

app.listen(process.env.PORT, () =>
  console.log("Server is running on :", process.env.PORT)
);
