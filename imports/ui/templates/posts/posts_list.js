import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../../api/posts/posts.js';

import './post_item.js';
import './posts_list.html';

Template.PostsList.onCreated(function() {
  const self = this;
  self.autorun(function() {
    Meteor.subscribe('posts');
  })
})

Template.PostsList.helpers({
  posts() {
    return Posts.find();
  }
});
