import './App_body.tpl.jade';

Template.App_body.helpers({
  loggedIn() {
    return Meteor.userId() !== null;
  },
  name() {
    return "John Doe";
  },
  email() {
    if (!Meteor.user()) return "";
    return Meteor.user().emails[0].address;
  }
})

Template.App_body.onRendered(function () {
  this.$(".button-collapse").sideNav({
    closeOnClick: true
  });
})
