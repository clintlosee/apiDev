var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.port || 3500;
var router = express.Router();
var Vehicle = require('./app/models/vehicle');

// set up bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to DB
mongoose.connect('mongodb://localhost:27017/apitest');

// set up route /api
app.use('/api', router);


// set up middleware
router.use(function(req, res, next) {
    console.log('Middleware is running now...');
    next();
});

// Test Router
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });
});

// actual routes
router.route('/vehicles')
    .post(function(req, res) {
        var vehicle = new Vehicle();
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        vehicle.save(function(err) {
            if (err)
                res.send(err);
            
            res.json({ message: 'Successfully saved vehicle' });
        });
    })

    .get(function(req, res) {
        Vehicle.find(function(err, vehicles) {
            if (err)
                res.send(err);

            res.json(vehicles);
        });
    });

router.route('/vehicle/:vehicle_id')
    .get(function(req, res) {
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
            if (err)
                res.send(err);

            res.json(vehicle);
        });
    });

router.route('/vehicle/make/:make')
    .get(function(req, res) {
        Vehicle.find({make: req.params.make}, function(err, vehicle) {
            if (err)
                res.send(err);
            
            res.json(vehicle);
        });
    });

router.route('/vehicle/color/:color')
    .get(function(req, res) {
        Vehicle.find({color: req.params.color}, function(err, vehicle) {
            if (err)
                res.send(err);

            res.json(vehicle);
        });
    });

// start up server
app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
