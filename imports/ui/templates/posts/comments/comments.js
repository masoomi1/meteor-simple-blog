import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Comments } from '../../../../api/comments/comments.js';

import './comment.js';
import './comments.html';

Template.Comments.onCreated(function() {
  const self = this;
  const postId = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('comments', postId);
  });
});

Template.Comments.helpers({
  comments() {
    const postId = FlowRouter.getParam('id');
    return Comments.find({ postId }, { sort: { createdAt: -1 } });
  },
});
