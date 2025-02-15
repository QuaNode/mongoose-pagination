var mongoose = require('mongoose');

mongoose.Query.prototype.paginate = function paginate(page, limit, cb) {
  page = parseFloat(page) || 1;
  limit = parseFloat(limit) || 10;

  var query = this;
  var model = this.model;
  var skipFrom = Math.round((page * limit) - limit);

  query = query.skip(skipFrom).limit(limit);

  if (cb) {
    query.exec(function (err, docs) {
      if (err) {
        cb(err, null, null);
      } else {
        model.countDocuments(query._conditions, function (err, total) {
          if (err) {
            cb(err, null, null);
          } else {
            cb(null, docs, total);
          }
        });
      }
    });
  } else {
    return this;
  }
};
