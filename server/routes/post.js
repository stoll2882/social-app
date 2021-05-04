const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PostStore = require('../data/poststore');
const UserStore = require('../data/userstore');

router.post("/", [
    body('email').isEmail(),
    body('text').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }

    var user = await UserStore.get(req.body.email);

    if(user == null) {
        console.log("Failed to get author's user data");
        return res.send("Could not find specified user").status(404).end();
    }

    var postDate = new Date();

    var newPost = new Post({
        user: user.id,
        text: req.body.text,
        created: postDate,
        edited: postDate
    });

    try {
        await PostStore.save(newPost);
    } catch(err) {
        console.log("Failed to save new post "+err);
    }

    res.status(200).end();
});

router.get("/", [], async (req, res) => {
    var posts = await PostStore.getAll();
    res.json(posts).status(200).end();
});

module.exports = router;