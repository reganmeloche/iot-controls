const mongoose = require('mongoose');
const Message = mongoose.model('messages');
const moment = require('moment');

module.exports = {
  getAll: function() {
    return Message.find({}).then((mongoResult) => {
      var x = mongoResult.map(x => {
          return {
              text: x.text,
              date: x.date,
          };
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      });
      return x;
    });
  },

  save: function(message) {
    return new Message({text: message.text, date: moment()}).save()
      .then(() => { 
        return {
          done: true,
        };
      });
  }
}
