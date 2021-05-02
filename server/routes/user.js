const express = require('express');
const router = express.Router();
const { param, body, validationResult } = require('express-validator');
const UserStore = require('../data/userstore');

router.post("/", [
    body('fname').not().isEmpty(),
    body('lname').not().isEmpty(),
    body('pwd').isLength( { min:6 } ),
    body('email').isEmail(),
    body('mobile').isMobilePhone( ['en-CA'] )
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }
    const foundUser = await UserStore.get(req.body.email);
    
    if(foundUser != null) {
        return res.send("User already exists").status(400);
    }

    var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        pwd: req.body.pwd,
        email: req.body.email,
        mobile: req.body.mobile
    });

    try {
        await UserStore.save(newUser);
    } catch(err) {
        console.log("Failed to save new user "+err);
    }

    res.status(200).end();
});

router.get("/:email", [
    param('email').isEmail()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).end();
    }
    const user = await UserStore.get(req.params.email);
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