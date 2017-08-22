//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
const route = require('./routes/route');

//conect to MONGODB and check
mongoose.connect('mongodb://localhost:27017/url-shortener');
mongoose.connection.on('connected',()=>{
  console.log('Connected to MongoDB database');
});
mongoose.connection.on('error',(err)=>{
  if(err){
    console.log('Error in DB connection '+err);
  }
});

//creating instance and asigning port constant
var app = express();
const port = 3000;

//adding middleware

//body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname,'public')));



//server routes
app.use('/api', route);
app.get('/',(req,res)=>{
  res.send('This is the app');
});


//starting app
app.listen(port,()=>{
  console.log('Server running at port'+ port);
});

//
