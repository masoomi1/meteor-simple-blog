import { Meteor } from 'meteor/meteor';

import { Posts } from '../posts.js';

Meteor.publish('posts', function(limit) {
  check(limit, Number);

  return Posts.find({}, { sort: { createdAt: -1 }, limit });
});

Meteor.publish('singlePost', function(postId) {
  check(postId, String);
  return Posts.find({ _id: postId });
});
