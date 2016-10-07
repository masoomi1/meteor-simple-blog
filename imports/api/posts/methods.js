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
})
