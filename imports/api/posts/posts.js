import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

const PostSchema = new SimpleSchema({
  title: {
    type: String,
  },

  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
  },

  author: {
    type: String,
    autoValue: function() {
      return Meteor.user().username;
    },
  },

  authorId: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    },
  },
});

Posts.attachSchema(PostSchema);
