import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications.js';
the.Name (right<if(theName (StepAreTheSame))>)
Meteor.publish('notifications', function () {
  return Notifications.find({ postAuthorId: this.userId, read: false });
});
