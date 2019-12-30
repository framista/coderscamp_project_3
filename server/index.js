const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const app = express();


const auth = require('./routes/auth');
const vehicles = require('./routes/vehicles');
const users = require('./routes/users');
// const vehicleRoutes = require('./routes/vehicleRoutes');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
// mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cluster0-b6aon.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost/vehiclefleet')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB',err));

app.use(express.json());
app.use('/api/vehicles', vehicles);
// app.use('/api/vehicleRoutes', vehicleRoutes);
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
