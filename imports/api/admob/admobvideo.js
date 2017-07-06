import { ReactiveVar } from 'meteor/reactive-var';

function prepare() {
  AdMob.prepareRewardVideoAd({
    adId: Meteor.settings.public.admob.toDoRewardVideo,
    // adId: "ca-app-pub-3940256099942544/5224354917",
    autoShow: false,
    isTesting: Meteor.settings.public.admob.testing
  }, function (e) {
    // success callback
  }, function (e) {
    // idk, probably reward anyway?!
    // I mean when the user clicks to watch the ad
    console.log('prepare failed callback');
    console.log(JSON.stringify(e));

    alert(JSON.stringify(e));
  });
}


const state = {
  ready: new ReactiveVar(false),
  playing: false,
  nextVideo: {
    pr: null,
    res: null,
    rej: null,
    refill() {
      state.ready.set(false);
      state.nextVideo.pr = new Promise((res, rej) => {
        state.nextVideo.res = res;
        state.nextVideo.rej = rej;
      });
    }
  },
  nextReward: {
    pr: null,
    res: null,
    rej: null,
    refill() {
      state.nextReward.pr = new Promise((res, rej) => {
        state.nextReward.res = res;
        state.nextReward.rej = rej;
      });
    }
  },
  newVideoReady() {
    this.ready.set(true);
    this.nextVideo.res()
  },
  newVideoError(err) {
    this.ready.set(false);
    this.nextVideo.rej(err);
    state.nextVideo.refill();
    prepare();
  },
  rewardReady(reward) {
    state.playing = false;
    this.nextReward.res(reward);

    state.nextReward.refill();
  },
  rewardDismissed(err) {
    state.playing = false;
    this.ready.set(false);
    this.nextReward.rej(err);

    prepare();
    state.nextReward.refill();
  },
  playVideo() {
    if (!state.ready.get()) {
      console.log("not ready!");
      throw new Meteor.Error('not-ready', "The video isn't ready to play yet!");
    }

    state.playing = true;
    AdMob.showRewardVideoAd();

    state.nextReward.pr.then(() => {
      state.nextVideo.refill();
      prepare();
    });

    return state.nextReward.pr;
  }
}


document.addEventListener('onAdLoaded', function(data){
  if(data.adType == 'rewardvideo') {
    state.newVideoReady();
  }
});
document.addEventListener('onAdFailLoad', function(data){
  if(data.adType == 'rewardvideo') {
    state.newVideoError({type: "loadFail"});
    console.log('Ad failed to load!', JSON.stringify(data, true, "  "));
  }
});
document.addEventListener('onAdDismiss', function(data){
  if(data.adType == 'rewardvideo') {
    console.log(state.playing);
    if (!state.playing) {
      prepare();
      return;
    }

    state.rewardDismissed({type: 'dismiss'});
  }
});
document.addEventListener('onAdLeaveApp', function(data){
  if(data.adType == 'rewardvideo') {
    state.rewardDismissed({type: 'left'});
  }
});
document.addEventListener('onAdPresent', function(e){
  if(e.adType == 'rewardvideo') {
    state.rewardReady({
      type:    e.rewardType,
      ammount: e.rewardAmount
    });
  }
});

// to have everything loaded
Meteor.startup(() => {
  if (Meteor.isCordova) {
    if (!AdMob) {
      throw new Meteor.Error("No-Admob", "Please install AdMob!");
    }
  } else {
    throw new Meteor.Error("No Cordova", "Please only run this package as cordova!");
  }

  state.nextVideo.refill();
  state.nextReward.refill();
  prepare();
});

export const AdMobVideo = {
  play() {
    return new Promise((res, rej) => {
      state.nextVideo.pr.then(() => {

        state.playVideo().then(reward => {

          console.log("reward: " + JSON.stringify(reward));
          res(reward);
        }).catch(err => {
          rej(err)
        }).done(() => {
          prepare();
        })
      })
    })

  },
  isReady() {
    return state.ready;
  },
  prepare() {
    prepare();
  }
};
