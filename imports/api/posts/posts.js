import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

const PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
  },

  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: "Url",
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },

  author: {
    type: String,
    autoValue: function() {
      return Meteor.user().username;
    },
    autoform: {
      type: "hidden"
    }
  },

  authorId: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden"
    }
  },
});

Posts.attachSchema(PostSchema);
