const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();


//connect to db
mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true,useNewUrlParser: true },
()=> console.log('Connected to DB !!'));

app.use(cors())
//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/me',postRoute);

app.listen(process.env.PORT,()=> console.log('Server is running on :',process.env.PORT));