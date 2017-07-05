
import { clearOldGunk } from '/imports/api/todos/server/clearOld.js'

SyncedCron.add({
  name: 'clear old entries from the DB',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 2:00 am');
  },
  job: function() {
    return clearOldGunk()
  }
});

console.log("Next cron:",SyncedCron.nextScheduledAtDate('clear old entries from the DB'));
