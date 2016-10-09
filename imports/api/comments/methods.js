import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

import { Posts } from '../posts/posts.js';
import { Comments } from './comments.js';

import { createNotification } from '../notifications/notifications.js';

Meteor.methods({
  'comments.insert': function (comment) {
    check(this.userId, String);
    check(comment, {
      postId: String,
      body: String,
    });

    const post = Posts.findOne(comment.postId);

    const commentId = Comments.insert(comment);
    Posts.update(post._id, {
      $inc: { comments: 1 }
    }, {
      getAutoValues: false
    });

    const commentInserted = Comments.findOne(commentId);
    createNotification(commentInserted);

    return {
      _id: commentId,
    };
  },
});
