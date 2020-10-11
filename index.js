const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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
dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to DB !!")
);

app.use(cors());
//Middleware
app.use(express.json());

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/me", meRoute);
app.use("/api/userlists", userlistsRoute);

app.listen(process.env.PORT, () =>
  console.log("Server is running on :", process.env.PORT)
);
