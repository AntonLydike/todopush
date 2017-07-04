import './App_home.tpl.jade';

import { Todos } from '/imports/api/todos/todos.js';
import { moment } from 'meteor/momentjs:moment';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/ui/components/loader/loader.tpl.jade';
import '/imports/ui/components/item/item.js';

Template.App_home.onCreated(function () {
  this.subscribe('todos.today');
  this.addDays = 1;
  this.addDaysColor = new ReactiveVar('amber');
  this.addLabelDay = new ReactiveVar('tomorrow');

  this.listDayString = new ReactiveVar('today');
  this.listDay = 0;
});

Template.App_home.helpers({
  todo() {
    let day = moment().startOf('day')._d;
    return Todos.find({day});
  },
  addButtonColor() {
    return Template.instance().addDaysColor.get();
  },
  day() {
    return Template.instance().addLabelDay.get();
  },
  listDay() {
    return Template.instance().listDayString.get();
  }
})


Template.App_home.events({
  'click .todo-item'(e, tpl) {
    Meteor.call('todos.setStatus', this._id, !this.done, (err, resp) => {
      if (err) {
        Materialize.toast(err.message, 6000, 'err');
      }
    })
  },
  'click #addNewToday'(e, tpl) {
    let text = tpl.$('#newToDo').val().trim();
    tpl.$('#newToDo').val("")
    tpl.$('label.active').removeClass('active');

    if (text.length == 0) {
      Materialize.toast('Please enter something', 6000, 'err');
      return tpl.$('#newToDo').focus();
    }

    Meteor.call('todos.add', text, tpl.addDays, (err, resp) => {
      if (err) {
        Materialize.toast(err.message, 6000, 'err');
      } else {
        Materialize.toast('Added something '
        + tpl.addLabelDay.get()
        + '<i class="material-icons left green-text">done</i>', 6000)
      }
    })

    tpl.addDays = 1;
    tpl.addDaysColor.set('amber');
    tpl.addLabelDay.set('tomorrow');
  },
  'contextmenu #addNewToday'(e, tpl) {
    e.preventDefault();

    tpl.$('.dark-bg').addClass('open');
  },
  'click .dark-bg [data-val]'(e, tpl) {
    tpl.$('.dark-bg').removeClass('open');
    let num = +$(e.target).attr('data-val'),
        color = $(e.target).attr('data-color'), numstr;

    tpl.$('.dark-bg .rotater').css('z-index','1000');
    $(e.target).parent().css('z-index','1002');

    console.log($(e.target));

    tpl.addDaysColor.set(color);
    tpl.addDays = num;

    switch (num) {
      case 0:
        numstr = 'today';
        break;
      case 1:
        numstr = 'tomorrow';
        break;
      default:
        numstr = `in ${num} days`;
    }

    tpl.addLabelDay.set(numstr);
  },
  'click .dark-bg'(e, tpl) {
    if (e.target.classList.contains('action-close')) tpl.$('.dark-bg').removeClass('open');
  }
})
