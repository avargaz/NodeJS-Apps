
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
//databse
var mongoose   = require('mongoose');
mongoose.connect('mongodb://nodeuser:123@ds062059.mlab.com:62059/bearapi'); // connect to our database
console.log(mongoose.connection.readyState);
mongoose.connection.on('error', function (err) {
 console.log("Error conectando a BD");
});
var Bear     = require('./models/bear');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
      //res.json({ message: 'Bear created!1' });
        var bear = new Bear();      // create a new instance of the Bear model
        //bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.name = "Juan";
        // save the bear and check for errors
        bear.pre("save", function(next) {
            if(!this.trial){
                //do your job here
                console.log("si entro al pre");
            }
            next();
        });
        bear.save(function(err) {
          console.log("entra al save");
            if (err){
              res.send(err);
            }
            res.json({ message: 'Bear created!' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
