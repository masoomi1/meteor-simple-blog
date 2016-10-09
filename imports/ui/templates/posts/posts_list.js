import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../../api/posts/posts.js';

import './posts.css';
import './post_item.js';
import './posts_list.html';

Template.PostsList.onCreated(function() {
  const self = this;
  self.requestedPosts = new ReactiveVar(3);

  self.autorun(function() {
    self.subscribe('posts', self.requestedPosts.get());
  });
});

Template.PostsList.helpers({
  posts() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  },
});

Template.PostsList.events({
  'click .load-more': function (event) {
    event.preventDefault();

    const instance = Template.instance();

    let reqPosts = instance.requestedPosts.get() + 3;
    instance.requestedPosts.set(reqPosts);
  },
});
