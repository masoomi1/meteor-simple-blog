import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';

import '../templates/notifications/notifications.js';

import './header.html';

Template.Header.events({
  "click .logout": function(event) {
    event.preventDefault();

    Accounts.logout( function (err) {
      if (err) {
        return;
      }
      FlowRouter.go('posts');
    });
  },
});
