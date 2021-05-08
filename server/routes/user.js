const express = require('express');
const router = express.Router();
const { param, body, validationResult } = require('express-validator');
const UserStore = require('../data/userstore');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.post("/", [
    body('email').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('firstName').not().isEmpty(),
    body('password').isLength( { min:6 } ),
    body('email').isEmail(),
    body('alias').isLength({ min:3 } ).not().isEmpty(),
    body('mobile').isMobilePhone( ['en-US'] )
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json( { errors: errors.array() });
        return;
    }
    const foundUser = await UserStore.get(req.body.email);
    
    if(foundUser != null) {
        res.send("User already exists").status(400).end();
        return;
    }

    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        alias: req.body.alias
    });


    try {
        await UserStore.save(newUser);
    } catch(err) {
        console.log("Failed to save new user "+err);
        res.send("Failed to create user").status(400).end();
    }
    
    const token = await UserStore.generateToken(newUser);

    res.send(token).status(200).end();
});

router.post("/login", [], async (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;

    const user = await UserStore.get(email);
    if(user != null) {
        if(bcrypt.compare(password, user.password)) {
            const token = await UserStore.generateToken(user);
            if(token == null) {
                res.status(500).end();
            } else {
                res.send(token).status(200).end();
            }
        } else {
            res.send(401).end();
        }
    } else {
        res.status(401).end();
    }
});

router.get("/", [
    auth
], async (req,res) => {
    const user = await UserStore.get(req.user.email);
    if(user != null) {
        res.json(user).status(200).end();
    } else {
        res.status(404).end();
    }
});

router.get("/", [], async (req, res) => {
    var users = await UserStore.getAll();
    res.json(users).status(200).end();
});

module.exports = router;