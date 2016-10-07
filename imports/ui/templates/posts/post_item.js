import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './post_item.html';

Template.PostItem.helpers({
  domain() {
    const a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  ownPost() {
    return Meteor.userId()===this.authorId;
  },
});

Template.PostItem.events({
  "click .details": function(event) {
    event.preventDefault();

    FlowRouter.go('/post/'+this._id);
  },

  'click .edit-post': function (event) {
    event.preventDefault();

    FlowRouter.go('/post/'+this._id+'/edit');
  },

  'click .remove-post': function (event) {
    event.preventDefault();

    Meteor.call('posts.remove', this._id);
    FlowRouter.go('posts');
  },
});
