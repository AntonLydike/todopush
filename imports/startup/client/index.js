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
  ph: 0,
  pw: 0,
  lh: 0,
  lw: 0,
  keyboard: false,
  portrait: screen.orientation.type.indexOf('portrait')>-1
}
// TODO optimize!
function recalc() {
  let w = $(window).width(),
      h = $(window).height();

  console.log(h);
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

window.todopush = {version:'1.0.1'}

import { Todos } from '/imports/api/todos/todos.js';

window.Todos = Todos;
