import { Template } from 'meteor/templating';

import './comment.html';

Template.Comment.helpers({
  createdAtString () {
    return this.createdAt.toDateString();
  }
});
