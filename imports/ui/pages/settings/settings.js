import { ReactiveVar } from 'meteor/reactive-var';

import { AdMobVideo } from '/imports/api/admob/admobvideo.js';

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
  },
  videoReadyClass() {
    return AdMobVideo.isReady().get() ? '' : 'grey-text';
  },
  videoReady() {
    return AdMobVideo.isReady().get()
  },
  adId() {
    return Meteor.settings.public.admob.toDoRewardVideo;
  },
  isTesting() {
    return Meteor.settings.public.admob.testing ? 'true' : 'false';
  }
})

Template.App_settings.events({
  'click .play-ad'(e, tpl) {
    if (!AdMobVideo.isReady().get()) return AdMobVideo.prepare();

    AdMobVideo.play().then((rew) => {
      console.log("in settings:", rew);
      Materialize.toast("Reward: " + rew.ammount + " ToDos!", 9000);
    }).catch((err) => {
      Materialize.toast("Aww. You failed!", 9000);
      console.log("in settings:", err);
    })
  }
})
