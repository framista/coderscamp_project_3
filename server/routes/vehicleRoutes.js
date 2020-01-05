const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const { VehicleRoute } = require('../models/vehicleRoute')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res) => {
    const vehicleRoutes = await VehicleRoute.find().sort('type');
    res.send(vehicleRoutes);
});

router.get('/:id', async (req, res) => {
    try {
        const vehicleRoute = await VehicleRoute.findById(req.params.id);
        if (!vehicleRoute) return res.status(404).send('The vehicle was not found 😲');
        res.send(vehicleRoute);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 Not correct ID');
    }
});

router.post('/', async (req, res) => {
    const vehicleRoute = new VehicleRoute({
        vehicle: req.body.vehicle,
        driver: req.body.driver,
        date: req.body.date,
        starting: req.body.starting,
        destination: req.body.destination,
        km: req.body.km,
        fuel: req.body.fuel,
        isFinished: req.body.isFinished,
        comments: req.body.comments
    });
    try {
        let response = await vehicleRoute.save();
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
});

// router.delete('/:id', [auth, admin], async (req, res) => {
router.delete('/:id', async (req, res) => {
    try {
        const vehicleRoute = await VehicleRoute.findByIdAndRemove(req.params.id);
        if (!vehicleRoute) return res.status(404).send('The vehicle was not found 😲 \n I cannot delete it 😒');
        res.send(vehicleRoute);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 \n I cannot delete it 😒 Not correct ID');
    }
});

router.put('/:id', bodyParser.json(), async (req, res) => {
    try {
        const vehicleRoute = await VehicleRoute.findByIdAndUpdate(req.params.id,
            {
                vehicle: req.body.vehicle,
                driver: req.body.driver,
                starting: req.body.starting,
                destination: req.body.destination,
                km: req.body.km,
                fuel: req.body.fuel,
                isFinished: req.body.isFinished,
                comments: req.body.comments
            }, { new: true });
        if (!vehicleRoute) return res.status(404).send('The vehicle was not found 😲');
        res.send(vehicleRoute);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 Not correct ID');
    }
})

module.exports = router;