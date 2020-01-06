const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const { Vehicle } = require('../models/vehicle')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res) => {
    const vehicles = await Vehicle.find().sort('type');
    res.send(vehicles);
});

router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).send('The vehicle was not found 😲');
        res.send(vehicle);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 Not correct ID');
    }
});

// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        type: req.body.type,
        brand: req.body.brand,
        plate: req.body.plate,
        productionYear: req.body.productionYear,
        fuelType: req.body.fuelType,
        isAvailable: req.body.isAvailable
    });
    try {
        let response = await vehicle.save();
        res.send(response);
    } catch (err) {
        res.send(err.message);
    }
});

// router.delete('/:id', [auth, admin], async (req, res) => {
router.delete('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndRemove(req.params.id);
        if (!vehicle) return res.status(404).send('The vehicle was not found 😲 \n I cannot delete it 😒');
        res.send(vehicle);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 \n I cannot delete it 😒 Not correct ID');
    }
});

router.put('/:id', bodyParser.json(), async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id,
            {
                type: req.body.type,
                brand: req.body.brand,
                plate: req.body.plate,
                productionYear: req.body.productionYear,
                fuelType: req.body.fuelType,
                isAvailable: req.body.isAvailable
            }, { new: true });
        if (!vehicle) return res.status(404).send('The vehicle was not found 😲');
        res.send(vehicle);
    } catch (err) {
        return res.status(404).send('The vehicle was not found 😲 Not correct ID');
    }
})

module.exports = router;