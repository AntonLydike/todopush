// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Todos } from '../todos.js';
import { moment } from 'meteor/momentjs:moment';

Meteor.publish('todos.all', function () {
  if (!this.userId) {
    return [];
  }

  return Todos.find({
    userId: this.userId
  });
});
Meteor.publish('todos.today', function () {
  if (!this.userId) {
    return [];
  }

  let day = moment().startOf('day')._d;
  return Todos.find({
    userId: this.userId,
    day
  });
});
