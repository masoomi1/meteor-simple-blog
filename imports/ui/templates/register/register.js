import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Errors } from '../errors/errors_collection.js';
import './register.html';

Template.Register.onCreated(function() {
  this.errorRegister = new ReactiveDict();
});

Template.Register.helpers({
  errorClass: function(field) {
    const instance = Template.instance();
    return !!instance.errorRegister.get(field) ? 'has-error' : '';
  },

  errorMessage: function(field) {
    const instance = Template.instance();
    return instance.errorRegister.get(field);
  },
});

Template.Register.events({
  "submit form": function(e, instance) {
    e.preventDefault();

    const userAttributes = {
        fullname: e.target.fullname.value,
      username: e.target.username.value,
      password1: e.target.password1.value,
      password2: e.target.password2.value,
    };

    // validate userAttributes
    instance.errorRegister.set('fullname', '');
    instance.errorRegister.set('username', '');
    instance.errorRegister.set('password1', '');
    instance.errorRegister.set('password2', '');
    instance.errorRegister.set('passwordMatch', '');

    if (!userAttributes.fullname)
        instance.errorRegister.set('fullname', 'Nome Completo obbligatorio');
    if (!userAttributes.username)
      instance.errorRegister.set('username', 'Username obbligatorio');
    if (userAttributes.username && userAttributes.username.length<3)
      instance.errorRegister.set('username', "Username deve contenere almeno tre caratteri");
    if (!userAttributes.password1)
      instance.errorRegister.set('password1', 'Password obbligatoria');
    if (!userAttributes.password2)
      instance.errorRegister.set('password2', 'Ripetizione Password obbligatoria');
    if (userAttributes.password1!==userAttributes.password2)
      instance.errorRegister.set('passwordMatch', 'Le password non coincidono');

    if (instance.errorRegister.get('fullname') ||
        instance.errorRegister.get('username') ||
        instance.errorRegister.get('password1') ||
        instance.errorRegister.get('password2') ||
        instance.errorRegister.get('passwordMatch')) {
      return;
    }

    Meteor.call('users.register', {
        profile: {
            name: userAttributes.fullname,
        },
      username: userAttributes.username,
      password: userAttributes.password1
    }, function(err, result) {
      if (err) {
        Errors.insert({ message: err.reason });
        return;
      }

      Meteor.loginWithPassword(userAttributes.username, userAttributes.password1);
      FlowRouter.go('posts');
    });
  }
});
