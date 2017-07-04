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


const sizes = {
  ph: null,
  pw: null,
  lh: null,
  lw: null,
  keyboard: null,
  portrait: screen.orientation.type.indexOf('portrait')>-1
}
if (sizes.portrait) {
  // it's portrait
  sizes.ph = $(window).height()
  sizes.ph = $(window).width()
} else {
  // it's landscape
  sizes.lh = $(window).height()
  sizes.lh = $(window).width()
}
// TODO optimize!
function recalc() {
  let w = $(window).width(),
      h = $(window).height();

  sizes.portrait = screen.orientation.type.indexOf('portrait')>-1
  if (sizes.portrait) {
    // it's portrait
    if (sizes.ph <= h) {
      sizes.ph = h;
      sizes.keyboard=false;
    } else {
      sizes.keyboard=true;
    }
    sizes.pw = w;
  } else {
    // it's landscape
    if (sizes.lh <= h) {
      sizes.lh = h;
      sizes.keyboard=false;
    } else {
      sizes.keyboard=true;
    }
    sizes.lw = w;
  }
}

function reziseFunc () {
  recalc();

  let w = $(window).width(),
      h = $(window).height();

  window.width = w;

  if (h < 80 || sizes.keyboard) {
    $('html').addClass('mobile-keyboard-deployed');
  } else {
    $('html').removeClass('mobile-keyboard-deployed');
  }
}
$(window).resize(reziseFunc);
reziseFunc();
// testing
import { Todos } from '/imports/api/todos/todos.js';
import { moment } from 'meteor/momentjs:moment';

window.moment = moment;
window.Todos = Todos;
