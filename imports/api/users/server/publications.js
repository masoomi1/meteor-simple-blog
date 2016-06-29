//import { Meteor } from 'meteor/meteor';
//import { Roles } from 'meteor/alanning:roles';

/*Meteor.publish('userData', function() {
    const userId = this.userId;

    if (userId) {
        return Meteor.users.find({ _id: userId }, {
             fields: {
                 profile: 1,
                 roles: 1
             }
         });
    } else {
        this.stop();
    }
});*/

/*Meteor.publish('usersAll', function() {
    const userId = this.userId;
    if (Roles.userIsInRole(userId, 'admin')) {
        return Meteor.users.find({});
    } else {
        this.stop();
    }
});
*/
