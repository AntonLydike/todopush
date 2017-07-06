// Import client startup through a single index entry point

console.log('=============================================== FRESH START ===============================================');

let old = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  testing: Meteor.settings.public.admob.testing
}

_.each(['log', 'warn', 'error'], (type) => {
  if (!old.testing) return;
  
  console[type] = function (...msgs) {
    _.each(msgs, (msg) => {
      let line = '['+ (new Error()).stack.toString().split(/\r\n|\n/)[5].replace(/^[\sat]+|\?hash\=[a-z0-9]{40}|http:\/\/localhost\:[0-9]+/g, '') +'] ';

      if (typeof msg === 'object') {
        old[type].call(console,line + JSON.stringify(msg, true, "  "));
      } else {
        old[type].call(console,line + msg);
      }
    })
  }
})

todopush = {version:'1.0.3m'}

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

window.Todos = Todos;
