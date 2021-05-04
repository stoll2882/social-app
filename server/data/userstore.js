const User = require('../models/user');

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
            await user.save();
        } catch(err) {
            console.log("Failed to save new user "+err);
        }        
    }

    static generateToken(user) {
        return { 
            id: user._id,
            token: 'test123',
            email: user.email,
            alias: user.alias,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile
        };
    }
    
}

module.exports = UserStore;
