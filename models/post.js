const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user.v2',
    },
    alias: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },   
    edited: {
        type: Date,
        default: Date.now,
    },      
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
        },
        text: {
          type: String,
          required: true,
        },
        created: {
          type: Date,
          default: Date.now,
        },
        edited: {
            type: Date,
            default: Date.now,
        }        
      },
    ]
  });

  module.exports = Post = mongoose.model('post.v2', PostSchema);
