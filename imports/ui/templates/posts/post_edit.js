import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Errors } from '../errors/errors_collection.js';

import { Posts } from '../../../api/posts/posts.js';

import './post_edit.html';

Template.PostEdit.onCreated(function() {
  const self = this;
  const postId = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('singlePost', postId);
  });
});

Template.PostEdit.helpers({
  post() {
    const postId = FlowRouter.getParam('id');
    const post = Posts.findOne({_id: postId});
    return post;
  },
});

Template.PostEdit.events({
  "submit form": function(event) {
    event.preventDefault();

    const postId = FlowRouter.getParam('id');

    const post = {
      title: event.target.title.value,
      url: event.target.url.value,
    };

    Meteor.call('posts.edit', postId, post, function(err, result) {
      if (err) {
        Errors.insert({ message: err.reason });
        return;
      }

      if (result.alreadyExists) {
        Errors.insert({ message: 'Post with this URL ('+post.url+') already exists' });
      }
      FlowRouter.go('/post/'+result._id);
    })
  }
})
