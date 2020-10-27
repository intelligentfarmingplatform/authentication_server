const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const db2 = require("./database/mysql2");
const cors = require("cors");
var helmet = require("helmet");
var session = require("express-session");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(helmet());
//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const meRoute = require("./routes/me");
const userlistsRoute = require("./routes/userlists");
const userprofileRoute = require("./routes/userprofile");
const provincesRoute = require("./routes/provinces");
const amphuresRoute = require("./routes/amphures");
const districtsRoute = require("./routes/districts");
const myproductsRoute = require("./routes/myproducts");
const sensorRoute = require("./routes/sensor");
dotenv.config();

db2.query("SELECT * FROM `testconnection`", (err) => {
  if (err) return console.log(`Failed to mysql DB !!`);

  console.log(`Connected to mysql DB !!`);
});

//connect to mongo db
mongoose.connect(
  process.env.MONGO_DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB !!")
);

app.use(cors());
//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/me", meRoute);
app.use("/api/userlists", userlistsRoute);
app.use("/api/userprofile", userprofileRoute);
app.use("/api/provinces", provincesRoute);
app.use("/api/amphures", amphuresRoute);
app.use("/api/districts", districtsRoute);
app.use("/api/myproducts", myproductsRoute);
app.use("/api/sensor", sensorRoute);

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const ownerRoute = require("./routes/owner");
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", ownerRoute);




app.listen(process.env.PORT, () =>
  console.log("Server is running on :", process.env.PORT)
);
