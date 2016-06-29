import { Meteor } from 'meteor/meteor';

import { Posts } from '../posts.js';

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('singlePost', function(postId) {
  check(postId, String);
  return Posts.find({ _id: postId });
});
