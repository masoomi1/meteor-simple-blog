import { Meteor } from 'meteor/meteor';

import { Comments } from '../comments.js';

Meteor.publish('comments', function (postId) {
  return Comments.find({ postId });
});
