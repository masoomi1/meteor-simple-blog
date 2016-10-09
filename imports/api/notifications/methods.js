import { Meteor } from 'meteor/meteor';

import { Notifications } from './notifications.js';

Meteor.methods({
  'notifications.read': function (notificationId) {
    check(this.userId, String);
    check(notificationId, String);

    Notifications.update(notificationId, { $set: { read: true } });
  },
});
