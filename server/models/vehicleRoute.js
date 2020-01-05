const config = require('config');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const vehicleRouteSchema = new mongoose.Schema({
    vehicle: {type: String, required: true },
    driver: {type: String, required: true },
    date:{type:Date, required:true},
    starting: {type: String, required: true },
    destination: {type: String, required: true },
    km: {type: Number, required: true },
    fuel: {type: Number, required: true },
    isFinished:{type: Boolean, required: true},
    comments: String
});


const VehicleRoute = mongoose.model('vehicleRoute', vehicleRouteSchema);