const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const app = express();

const auth = require('./routes/auth');
const vehicles = require('./routes/vehicles');
const users = require('./routes/users');
const vehicleRoutes = require('./routes/vehicleRoutes');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vehiclefleet')
    .then(() => console.log('Connected to MongoDC...'))
    .catch(err => console.error('Could not connect to MongoDB',err));

app.use(express.json());
app.use('/api/vehicles', vehicles);
app.use('/api/vehicleRoutes', vehicleRoutes);
app.use('/api/users', users);

async function createAdmin(){
    const user = new User({
        name: 'Admin',
        surname: 'Admin',
        password: 'xxx',
        email: 'xxx',
        isAdmin: true
    });
    try{
        const result = await user.save();
        console.log(result);
    }
    catch (ex){
        console.log(ex.message);
    }
}

async function createTestVehicle(){
    const vehicle = new Vehicle({
        number: 1,
        type: 'SUV',
        brand: 'BMW',
        plate: 'DW123',
        productionYear: '2012',
        fuelType: 'Gasoline'
    });
    try{
        const result = await vehicle.save();
        console.log(result);
    }
    catch (ex){
        console.log(ex.message);
    }
}

async function createTestRoute(){
    const route = new VehicleRoute({
        vehicle: 'DW123',
        driver: 'Admin',
        starting: 'Wrocław',
        destination: 'Poznań',
        km: 250,
        fuel: 120
    });
    try{
        const result = await route.save();
        console.log(result);
    }
    catch (ex){
        console.log(ex.message);
    }
}

createAdmin();
createTestVehicle();
createTestVehicleRoute();


