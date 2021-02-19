const mongoose = require('mongoose');

var showSchema = mongoose.Schema({
  showName: String,
  showImg: String,
});

var showModel = mongoose.model('shows', showSchema);

module.exports = showModel;