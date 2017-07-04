import './item.tpl.jade';

Template.item.onCreated(function () {
  this.slide = {
    posx:0,
    posy:0,
    posxstart: null,
    posystart: null,
    terminated: false
  };
})

Template.item.helpers({
  doneClass() {
    return this.done ? 'grey lighten-4' : '';
  },
  setAtDate() {
    return moment(this.createdAt).format('DD.MMM HH:mm');
  }
})

Template.item.events({
  'touchstart .collection-item, touchmove .collection-item'(e, tpl) {
    let posx = e.touches[0].clientX,
        posy = e.touches[0].clientY;

    if (tpl.slide.posxstart === null) {
      tpl.slide.terminated = false;
      tpl.slide.posx = tpl.slide.posxstart = posx;
      tpl.slide.posy = tpl.slide.posystart = posy;
      tpl.slide.innerHeight = tpl.$('.inner-item').height();
    } else {
      tpl.slide.posx = posx;
      tpl.slide.posy = posy;
    }

    if (tpl.slide.terminated) return;

    let diff = {
      x: tpl.slide.posx - tpl.slide.posxstart,
      y: tpl.slide.posy - tpl.slide.posystart
    };

    if (Math.abs(diff.y) > 60) {
      //tpl.slide.terminated = true;
      tpl.$('.collection-item').trigger('touchend')
    }

    if (Math.abs(diff.x) < 10) diff.x = 0;

    tpl.$('.item-bg').css({
      opacity: (Math.abs(diff.x) / window.width)
    })

    return tpl.$('.inner-item').css({
      transform: 'translateX(' + diff.x + 'px)',
      opacity: 1 - (Math.abs(diff.x) / window.width)
    });

  },
  'touchend .collection-item, touchcancel .collection-item, touchleave .collection-item'(e, tpl) {
    tpl.slide.terminated = true;

    let totalWidth = tpl.$('.inner-item').width(),
        multi = tpl.slide.posx < tpl.slide.posxstart ? -1 : 1;

    if (Math.abs(tpl.slide.posx - tpl.slide.posxstart) > totalWidth * 0.33) {
      // slid far enough, remove it!

      tpl.$('.inner-item').css({
        transition: '.3s',
        transform: 'translateX(' + (multi * window.width) + 'px)',
        opacity: 0,
        height: tpl.slide.innerHeight
      })
      tpl.$('.item-bg').css({
        opacity: 1
      })

      setTimeout(() => {
        tpl.$('.todo-item').css({
          padding: 0
        })
        tpl.$('.inner-item').css({
          padding: 0,
          height: 0
        });

        tpl.$('.item-bg').css({
          transition: '.3s',
          opacity: 0
        })

      }, 300)

      let msg = $('<span>Deleted item<a class="btn-flat amber-text waves-effect waves-light">undo</a></span>');

      msg.find('a').click(() => {
        tpl.slide.cancelled = true;

        tpl.$('.todo-item').css({
          padding: '',
        })
        tpl.$('.inner-item').css({
          padding: '',
          height: tpl.slide.innerHeight,
          opacity: 1,
          transform: 'translateX(0px)'
        });

        setTimeout(() => {
          tpl.$('.inner-item').css({
            transition: ''
          });
        }, 300);

        $('.toast-' + this._id).fadeOut();
      })

      Materialize.toast(msg, 6000, 'toast-' + this._id, () => {
        if (tpl.slide.cancelled) return tpl.slide.cancelled = false;
        Meteor.call('todos.remove', this._id, function (err, resp) {
          console.log(err, resp);
        })
      });
    } else {
      // didn't slide far enough! abort!
      tpl.$('.inner-item').css({
        transition: '.3s',
        transform: 'translateX(0px)',
        opacity: 1
      })

      tpl.$('.item-bg').css({
        transition: '',
        opacity: 0
      })

      setTimeout(() => {
        tpl.$('.inner-item').css({transition: ''});

      }, 300)
    }

    tpl.slide.posxstart = tpl.slide.posystart = null;

  }
})
