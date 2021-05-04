import axios from "axios";

import { getAppApiUrl } from '../Config';
import UserService from './UserService';

export default class NotifyService {
    static async contactMe(subject, text) {
        var userInfo = UserService.getUserInfo();
        if(userInfo == null) {
            console.log("Error getting user for the post");
            return;
        }
        try {
            var contactMeInfo = { email: userInfo.email, subject: subject, text: text };
            await axios.post(getAppApiUrl()+'/api/notify/contactme', contactMeInfo);
            return true;
        } catch(err) {
            console.log("Error asking for contact me.."+err);
            return false;
        }
    }
}
