import axios from "axios";

import { getAppApiUrl } from '../Config';
import UserService from './UserService';

export default class PostService {
    static async post(text) {
        var userInfo = UserService.getUserInfo();
        if(userInfo == null) {
            console.log("Error getting user for the post");
            return;
        }
        try {
            var postInfo = { email: userInfo.email, text: text };
            await axios.post(getAppApiUrl()+'/api/post', postInfo);
        } catch(err) {
            console.log("Error writing new post.."+err);
        }
    }

    static async getAllPosts() {
        try {
            var posts = await axios(getAppApiUrl()+"/api/post");
            return posts.data;
        } catch(err) {
            console.log("Failed to load posts: "+err);
            return [];
        }
    }

    static async delete(postId) {
        try {
            await axios.delete(getAppApiUrl()+"/api/post/"+postId);
            return true;
        } catch(err) {
            console.log("Failed to delete posting: "+err);
            return false;
        }
    }
}
