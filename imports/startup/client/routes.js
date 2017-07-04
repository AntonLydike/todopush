import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/not-found/not-found.js';

Session.setDefault('redirectAfterLogin', '/');

const exposed = FlowRouter.group({
  triggersEnter: [
    () => {
      if (Meteor.loggingIn() || Meteor.userId()) {
        return FlowRouter.redirect('/');
      }
    }
  ]
});

exposed.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'App_login' });
  }
})

const loggedIn = FlowRouter.group({
  triggersEnter: [
    () => {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        let route = FlowRouter.current();
        if (route.route.name !== 'App.login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('/login');
      }
    }
  ]
});

Accounts.onLogin(() => {
  let redirect = Session.get('redirectAfterLogin');

  if (redirect !== null && redirect !== '/login') {
    return FlowRouter.go(redirect);
  }
})

loggedIn.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

loggedIn.route('/logout', {
  name: 'App.logout',
  action() {
    Meteor.logout();
    FlowRouter.redirect('/login');
  }
})

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
