// Import client startup through a single index entry point

import './routes.js';
// improve speed
import '../../api/todos/methods.js';

try {
  var _$ = require("jquery");
  $ = _$;
  jQuery = _$;
} catch (e) {
  console.warn("error updating jquery");
  console.error(e);
}



window.width = $(window).width();

$(window).resize(() => {
  window.width = $(window).width();
})

// testing
import { Todos } from '/imports/api/todos/todos.js';
import { moment } from 'meteor/momentjs:moment';

window.moment = moment;
window.Todos = Todos;
