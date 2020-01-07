const config = require('config');
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: {
        type: String, required: true,
        enum: ['Micro', 'Sedan', 'CUV', 'SUV', 'Coupe', 'Hatchback', 'Pickup',
            'VAN', 'Campervan', 'Mini Truck', 'Minivan', 'Truck', 'Big Truck', 'Bus']
    },
    brand: { type: String, required: true }, // like BMW
    plate: { type: String, required: true },
    productionYear: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    fuelType: { type: String, required: true, enum: ['Gasoline', 'Diesel'] },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

exports.Vehicle = Vehicle;