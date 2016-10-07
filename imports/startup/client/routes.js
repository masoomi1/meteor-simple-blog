import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/templates/posts/posts_list.js';
import '../../ui/templates/posts/post_view.js';
import '../../ui/templates/posts/post_submit.js';
import '../../ui/layouts/main_layout.js';

FlowRouter.route('/', {
  name: 'posts',
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostsList' });
  }
});

FlowRouter.route('/post/:id', {
  name: 'PostView',
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostView' });
  }
});

FlowRouter.route('/submit', {
  name: 'PostSubmit',
  triggersEnter: [loginRequired],
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostSubmit' });
  }
});

function loginRequired() {
  if (!Meteor.userId()) {
    FlowRouter.go('posts');
  }
}
