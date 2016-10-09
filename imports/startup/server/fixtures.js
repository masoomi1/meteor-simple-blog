import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Posts } from '../../api/posts/posts.js';

if (Meteor.users.find().count()===0 && Posts.find().count()===0) {
  let i;

  const testUserId = Accounts.createUser({ username: 'test', password: 'test' });
  const testUser = Meteor.users.findOne(testUserId);

  for (i = 0; i < 20; i++) {
    Posts.insert({
      author: testUser.username,
      authorId: testUserId,
      title: 'Test #' + i,
      url: 'http://test-' + i + '.com',
      comments: 0,
      createdAt: new Date(),
    }, {
      getAutoValues: false,
    });
  }
}
