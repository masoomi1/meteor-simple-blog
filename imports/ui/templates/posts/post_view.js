import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../../api/posts/posts.js';

import '../../partials/not_found.html';
import './post_view.html';

Template.PostView.onCreated(function() {
  const self = this;
  const postId = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('singlePost', postId);
  });
});

Template.PostView.helpers({
  post() {
    const postId = FlowRouter.getParam('id');
    const post = Posts.findOne({_id: postId});
    return post;
  }
});
