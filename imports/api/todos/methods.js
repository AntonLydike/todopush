// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Todos } from './todos.js';

import { moment } from 'meteor/momentjs:moment';

Meteor.methods({
  'todos.add'(text, offsetDays) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authenticated', 'You need to be logged in!');
    }

    check(text, String);
    check(offsetDays, Number);

    if (offsetDays < 0 || offsetDays > 31) {
      throw new Meteor.Error('out-of-range', 'offset Days must be between 0 and 31');
    }

    let day = moment().add(offsetDays, 'days').startOf('day')._d;

    return Todos.insert({
      text,
      day,
      done: false,
      userId: Meteor.userId(),
      createdAt: new Date(),
    });
  },
  'todos.setStatus'(_id, status = true) {
    check(_id, String);
    check(status, Boolean);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authenticated', 'You need to be logged in!');
    }

    let item = Todos.findOne(_id);

    if (!item || item.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-found', 'No todo with that id found!');
    }

    Todos.update(_id, {$set:{
      done: status
    }})

    return true;
  },
  'todos.remove'(_id) {
    check(_id, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authenticated', 'You need to be logged in!');
    }

    let removedCount = Todos.remove({
      _id,
      userId: Meteor.userId()
    });

    if (removedCount == 0) {
      throw new Meteor.Error('not-found', 'No todo with that id found!');
    }

    return true;
  }
});
