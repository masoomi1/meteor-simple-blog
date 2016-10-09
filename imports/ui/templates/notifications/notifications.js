import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Notifications } from '../../../api/notifications/notifications.js';

import './notifications.html';

Template.Notifications.onCreated(function () {
  const self = this;
  self.autorun(function () {
    self.subscribe('notifications');
  });
})

Template.Notifications.helpers({
  notificationsCount() {
      return Notifications.find({ postAuthorId: Meteor.userId(), read: false }).count();
  },

  notifications() {
    return Notifications.find({ postAuthorId: Meteor.userId(), read: false });
  },
});

Template.Notifications.events({
  'click .notification': function (event) {
    event.preventDefault();

    const notificationId = this._id;
    const postId = this.postId;

    Meteor.call('notifications.read', notificationId, function (err) {
      if (err) {
        console.log(err.reason);
        return;
      }

      FlowRouter.go('/post/' + postId);
    });
  },
});
