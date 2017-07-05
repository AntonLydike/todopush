import { Todos } from '../todos.js';
import { moment } from 'meteor/momentjs:moment';

export const clearOldGunk = function clearOldGunk () {
  let yesterday = moment().subtract(1, "day")._d;

  let count = Todos.remove({day: {$lt: yesterday}});

  console.log('cleared ' + count + ' items out of the DB');

  return 'cleared ' + count + ' items out of the DB';
}
