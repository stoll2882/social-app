import axios from "axios";

import { getAppApiUrl } from '../Config';

export default class UserService {
    static async login(username, password) {
        try {
            var credentials = { username: username, password: password };
            var userToken = await axios.post(getAppApiUrl()+'/api/user/login', credentials);
            localStorage.setItem("token", JSON.stringify(userToken.data));
        } catch(err) {
            console.log("ERROR: Could not login: "+err);
        }
    }

    static isLoggedIn() {
        return (localStorage.getItem("token")) != null;
    }

    static async logout() {
        localStorage.removeItem("token");
    }
}
