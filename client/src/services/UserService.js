import axios from "axios";

import { getAppApiUrl } from '../Config';

export default class UserService {
    static async login(email, password) {
        try {
            var credentials = { email: email, password: password };
            var userToken = await axios.post(getAppApiUrl()+'/api/user/login', credentials);
            localStorage.setItem("token", JSON.stringify(userToken.data));
        } catch(err) {
            console.log("ERROR: Could not login: "+err);
        }
    }

    static async register(email, password, firstName, lastName, mobile, alias) {
        try { 
            var registrationInfo = { 
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                mobile: mobile,
                alias: alias 
            };
            var userToken = await axios.post(getAppApiUrl()+'/api/user', registrationInfo);
            localStorage.setItem("token", JSON.stringify(userToken.data));
        } catch(err) {
            console.log("ERROR: Could not register: "+err);
        }
    }

    static getUserInfo() {
        var token = localStorage.getItem("token");
        if(token == null) {
            return null;
        } else {
            var parsedToken = JSON.parse(token);
            return {
                id: parsedToken.id,
                email: parsedToken.email,
                firstName: parsedToken.firstName,
                lastName: parsedToken.lastName,
                mobile: parsedToken.mobile,
                alias: parsedToken.alias
            };
        }
    }

    static isLoggedIn() {
        return (localStorage.getItem("token")) != null;
    }

    static async logout() {
        localStorage.removeItem("token");
    }
}
