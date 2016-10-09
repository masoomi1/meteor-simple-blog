import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Posts } from '../../../api/posts/posts.js';

import { Errors } from '../errors/errors_collection.js';

import './comments/comments.js';
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
  },
});

Template.PostView.events({
  'submit form': function (event) {
    event.preventDefault();

    const postId = FlowRouter.getParam('id');

    const body = event.target.body;

    const comment = {
      postId,
      body: body.value,
    };

    Meteor.call('comments.insert', comment, function (err, result) {
      if (err) {
        Errors.insert({ message: err.reason });
        return;
      }

      body.value = '';
    });
  },
});
