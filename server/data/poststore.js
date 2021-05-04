const Post = require('../models/post');

class PostStore {

    static async getAll() {
        try {
            let posts = await Post.find().exec();
            return posts;
        } catch(err) {
            console.log('Error - could not get all posts: '+email);
            return [];
        }    
    }

    static async getForUser(userId) {
        try {
            let posts = await Post.find({ user: userId }).exec();
            return posts;
        } catch(err) {
            console.log("Error - could not get all posts for userId: "+userId);
            return [];
        }
    }

    static async save(post) {
        try {
            await post.save();
        } catch(err) {
            console.log("Failed to save post "+err);
        }        
    }

    static async delete(postId) {
        try {
            await Post.findByIdAndDelete(postId);
        } catch(err) {
            console.log("Failed to delete post "+err);
        }
    }
    
}

module.exports = PostStore;

