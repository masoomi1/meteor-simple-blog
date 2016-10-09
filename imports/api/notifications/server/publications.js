import { Meteor } from 'meteor/meteor';

Meteor.publish('notifications', function () {
  return Notifications.find({ postAuthorId: this.userId });
});
