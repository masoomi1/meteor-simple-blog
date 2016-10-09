import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications.js';

Meteor.publish('notifications', function () {
  return Notifications.find({ postAuthorId: this.userId, read: false });
});
