const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    number: {type: Number, required: true },    // some serial number
    type: {type: String, required: true, 
        enum: ['Micro', 'Sedan', 'CUV', 'SUV', 'Coupe', 'Hatchback', 'Pickup',
             'VAN', 'Campervan', 'Mini Truck', 'Minivan', 'Truck', 'Big Truck', 'Bus'] },   
    brand: {type: String, required: true }, // like BMW
    plate: {type: String, required: true },
    productionYear: {type: Date, required: true},
    isAvaliable: {type: Boolean, default: true },
    fuelType: {type: String, required: true, enum:['Gasoline', 'Diesel'] },
    routes: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

exports.Vehicle = Vehicle;