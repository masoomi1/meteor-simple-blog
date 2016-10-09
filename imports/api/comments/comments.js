import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('comments');

const CommentSchema = new SimpleSchema({
  postId: {
    type: String,
  },

  userId: {
    type: String,
    autoValue: function () {
      return Meteor.userId();
    },
  },

  author: {
    type: String,
    autoValue: function () {
      return Meteor.user().username;
    },
  },

  createdAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    },
  },

  body: {
    type: String,
  },
});

Comments.attachSchema(CommentSchema);
