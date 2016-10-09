import { Mongo } from 'meteor/mongo';

import { Posts } from '../posts/posts.js';

export const Notifications = new Mongo.Collection('notifications');

export const createNotification = function (comment) {
  let notification = {};
  notification.commenterId = comment.userId;
  notification.commenterName = comment.author;
  notification.postId = comment.postId;

  const post = Posts.findOne(comment.postId);
  notification.postAuthorId = post.authorId;
  if (notification.postAuthorId!==notification.commenterId) {
    Notifications.insert(notification);
  }
};

const NotificationSchema = new SimpleSchema({
  postId: {
    type: String,
  },

  postAuthorId: {
    type: String,
  },

  commenterId: {
    type: String,
  },

  commenterName: {
    type: String,
  },

  read: {
    type: Boolean,
    defaultValue: false,
  },
});

Notifications.attachSchema(NotificationSchema);
