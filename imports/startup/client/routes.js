import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main_layout.js';
import '../../ui/partials/not_found.html';
import '../../ui/templates/register/register.js';
import '../../ui/templates/login/login.js';
import '../../ui/templates/posts/posts_list.js';
import '../../ui/templates/posts/post_view.js';
import '../../ui/templates/posts/post_submit.js';

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('MainLayout', { content: 'NotFound' });
  }
};

FlowRouter.route('/', {
  name: 'posts',
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostsList' });
  }
});

FlowRouter.route('/signup', {
    name: 'sigup',
    action() {
        BlazeLayout.render('MainLayout', { content: 'Register' });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('MainLayout', { content: 'Login' });
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
