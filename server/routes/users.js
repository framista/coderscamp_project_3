const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.send(user);
})

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users.map(user => _.pick(user, ['_id', 'name', 'email', 'phone', 'isAdmin', 'lastActiveAt'])));
})

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone', 'isAdmin']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin
            }, { new: true });
        if (!user) return res.status(404).send('The user was not foound');
        res.send(user);
    } catch (err) {
        return res.status(404).send('The user was not found');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) return res.status(404).send('The user was not found');
        res.send(user);
    } catch (err) {
        return res.status(404).send('The user was not found');
    }
});

router.get('/emails', async (req, res) => {
    const emails = await User.find().select('email');
    res.send(emails);
});

module.exports = router; 
