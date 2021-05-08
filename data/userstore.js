const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserStore {

    static async get(email) {
        try {
            let user = await User.findOne( { email: email }).exec();
            return user;
        } catch(err) {
            console.log('Error - could not find user: '+email);
            return null;
        }
    }

    static async getAll() {
        try {
            let users = await User.find().exec();
            return users;
        } catch(err) {
            console.log('Error - could not get all users: '+email);
            return [];
        }    
    }

    static async save(user) {
        try {
            const salt = await bcrypt.genSalt(parseInt(config.get("Security.passwordSalt")));
            user.password  = await bcrypt.hash(user.password, salt);
            await user.save();
        } catch(err) {
            console.log("Failed to save new user "+err);
        }        
    }

    static async generateToken(user) {

        const payload = {             
            id: user._id,
            email: user.email,
            alias: user.alias,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile
        };

        try {
            const token = await jwt.sign(
                payload, 
                config.get('Security.jwtSecret'),
                { expiresIn: '5 days'}
            );
            return token;            
        } catch(err) {
            console.log("Error generating token: "+err);
            return null;
        }
    }
    
}

module.exports = UserStore;
