import './App_home.tpl.jade';

import { Todos } from '/imports/api/todos/todos.js';
import { moment } from 'meteor/momentjs:moment';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/ui/components/loader/loader.tpl.jade';
import '/imports/ui/components/item/item.js';

Template.App_home.onCreated(function () {
  this.subscribe('todos.all');
  this.addDays = 1;
  this.addDaysColor = new ReactiveVar('amber');
  this.addLabelDay = new ReactiveVar('tomorrow');

  this.listDay = new ReactiveVar(0);
});

Template.App_home.onRendered(function () {
  const self = this,
        picker = this.picker = $('#hiddenDatePick').pickadate({
    min: true,
    max: moment().add(5, 'days')._d,
    format: 'dd.mm.yy'
  }).pickadate('picker');

  picker.on({
    close() {
      let date = moment(picker.get(), 'DD.MM.YY');
      self.listDay.set(date.diff(moment().startOf('day'), 'days'));
    }
  })
})

Template.App_home.helpers({
  todo() {
    let day = moment().add(Template.instance().listDay.get(), 'days').startOf('day')._d;
    return Todos.find({day});
  },
  addButtonColor() {
    return Template.instance().addDaysColor.get();
  },
  day() {
    return Template.instance().addLabelDay.get();
  },
  listDay() {
    return dayDiffToString(Template.instance().listDay.get());
  },
  isToday() {
    return Template.instance().listDay.get() == 0
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

      tpl.addDays = 1;
      tpl.addDaysColor.set('amber');
      tpl.addLabelDay.set('tomorrow');
    })
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

    numstr = dayDiffToString(num);

    tpl.addLabelDay.set(numstr);
  },
  'click .dark-bg'(e, tpl) {
    if (e.target.classList.contains('action-close')) tpl.$('.dark-bg').removeClass('open');
  },
  'click .action-date'(e, tpl) {
    setTimeout(() => {
      tpl.picker.open()
    }, 10);
  }
})

function dayDiffToString(num) {
  switch (num) {
    case 0:
      return 'today';
      break;
    case 1:
      return 'tomorrow';
      break;
    default:
      return 'on ' + moment().add(num, 'days').format('dddd').toLowerCase();
  }
}
