import { ReactiveVar } from 'meteor/reactive-var';

import './App_settings.tpl.jade';

const version = new ReactiveVar('');


if (Meteor.isCordova) {
  cordova.getAppVersion.getVersionNumber().then(function (v) {
      version.set(v);
  });
} else {
  try {
    version.set(todopush.version);
  } catch (e) {
    console.log(e);
  }
}


Template.App_settings.onCreated(function () {
  this.version = version;
  if (!Meteor.isCordova) {
    version.set(todopush.version);
  }
})

Template.App_settings.helpers({
  version() {
    return Template.instance().version.get();
  }
})
