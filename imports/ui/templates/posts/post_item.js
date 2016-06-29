import { Template } from 'meteor/templating';

import './post_item.html';

Template.PostItem.helpers({
  domain() {
    const a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
