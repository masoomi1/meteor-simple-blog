import { Posts } from '../../api/posts/posts.js';

if (Posts.find().count()===0) {
  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
  });

  Posts.insert({
    title: 'Google',
    url: 'http://google.com',
  });
}
