import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './post_item.html';

Template.PostItem.helpers({
  domain() {
    const a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.PostItem.events({
  "click .details": function(event) {
    FlowRouter.go('/post/'+this._id);
  }
})
