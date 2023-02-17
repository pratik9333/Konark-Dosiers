const exphb = require("express-handlebars");

const myhbs = exphb.create({
  helpers: {
    notequal: function (a, b, options) {
      return a != b ? options.fn(this) : options.inverse(this);
    },
    round: function (number) {
      return Math.round(number) / 100;
    },
    date: function (dateString) {
      const date = new Date(dateString);

      return `${date.getMonth() + 1}/${
        date.getDate() + 1
      }/${date.getFullYear()}`;
    },
  },
});

module.exports = myhbs;
