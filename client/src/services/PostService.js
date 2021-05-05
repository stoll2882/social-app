import axios from "axios";

import { getAppApiUrl } from '../Config';
import UserService from './UserService';

export default class PostService {
    static async post(text) {
        try {
            var postInfo = { text: text };
            await axios.post(getAppApiUrl()+'/api/post', postInfo, UserService.getAuthHeaders());
        } catch(err) {
            console.log("Error writing new post.."+err);
        }
    }

    static async getAllPosts() {
        try {
            var posts = await axios(getAppApiUrl()+"/api/post", UserService.getAuthHeaders());
            return posts.data;
        } catch(err) {
            console.log("Failed to load posts: "+err);
            return [];
        }
    }

    static async delete(postId) {
        try {
            await axios.delete(getAppApiUrl()+"/api/post/"+postId, UserService.getAuthHeaders());
            return true;
        } catch(err) {
            console.log("Failed to delete posting: "+err);
            return false;
        }
    }
}
