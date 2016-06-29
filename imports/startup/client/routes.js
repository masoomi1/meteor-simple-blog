import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main_layout.js';
import '../../ui/partials/not_found.html';
import '../../ui/templates/posts/posts_list.js';
import '../../ui/templates/posts/post_view.js';

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

FlowRouter.route('/post/:id', {
  name: 'PostView',
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostView' });
  }
});
