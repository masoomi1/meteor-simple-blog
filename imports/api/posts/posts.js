import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

const PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
  },

  url: {
    type: SimpleSchema.RegEx.Url,
    label: "Url",
  }
});

Posts.attachSchema(PostSchema);
