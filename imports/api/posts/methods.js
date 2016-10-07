import { Meteor } from 'meteor/meteor';

import { Posts } from './posts.js';

Meteor.methods({
  "posts.submit": function(post) {
    check(this.userId, String);
    check(post, {
      title: String,
      url: String
    });

    const sameUrlPost = Posts.findOne({ url: post.url });
    if (sameUrlPost) {
      return {
        _id: sameUrlPost._id,
        alreadyExists: true
      }
    }

    const postId = Posts.insert(post);

    return {
      _id: postId
    };
  },

  "posts.edit": function(postId, post) {
    check(this.userId, String);
    check(postId, String);
    check(post, {
      title: String,
      url: String
    });

    const sameUrlPost = Posts.findOne({ url: post.url });
    if (sameUrlPost && sameUrlPost._id!==postId) {
      return {
        _id: sameUrlPost._id,
        alreadyExists: true
      }
    }

    Posts.update(postId, { $set: post }, { getAutoValues: false });

    return {
      _id: postId
    };
  },

  'posts.remove': function (postId) {
    check(this.userId, String);
    check(postId, String);

    const post = Posts.findOne(postId);
    if (post && post.authorId===this.userId) {
      Posts.remove(postId);
    }
  },
})
