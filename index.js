const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vehiclefleet')
    .then(() => console.log('Connected to MongoDC...'))
    .catch(err => console.error('Could not connect to MongoDB',err));

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    surname: {type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    phone: Number,
    isAdmin: {type: Boolean, default: false },
    lastActiveAt: {type: Date, default: Date.now}
});

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
const User = mongoose.model('User', userSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

const routeSchema = new mongoose.Schema({
    vehicle: {type: String, required: true },
    driver: {type: String, required: true },
    starting: {type: String, required: true },
    destination: {type: String, required: true },
    km: {type: Number, required: true },
    fuel: {type: Number, required: true },
    comments: String
});


const Route = mongoose.model('Route', routeSchema);

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
    const route = new Route({
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
createTestRoute();


