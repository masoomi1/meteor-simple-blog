import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/templates/posts/posts_list.js';
import '../../ui/layouts/main_layout.html';

FlowRouter.route('/', {
  name: 'posts',
  action() {
    BlazeLayout.render('MainLayout', { content: 'PostsList' });
  }
})
