import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Errors } from '../errors/errors_collection.js';

import { Posts } from '../../../api/posts/posts.js';

import './post_submit.html';

Template.PostSubmit.helpers({
  Posts() {
    return Posts;
  }
});

Template.PostSubmit.events({
  "submit form": function(event) {
    event.preventDefault();

    const post = {
      title: event.target.title.value,
      url: event.target.url.value,
    };

    Meteor.call('posts.submit', post, function(err, result) {
      if (err) {
        Errors.insert({ message: err.reason });
      }

      if (result.alreadyExists) {
        Errors.insert({ message: 'Post with this URL ('+post.url+') already exists' });
      }
      FlowRouter.go('/post/'+result._id);
    })
  }
})
