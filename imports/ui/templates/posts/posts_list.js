import { Template } from 'meteor/templating';

import './post_item.js';
import './posts_list.html';

Template.PostsList.helpers({
  posts() {
    return [
      { title: 'Meteor', url: 'http://meteor.com' },
      { title: 'Google', url: 'http://google.com' },
    ]
  }
});
