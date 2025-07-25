const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  name: String,
  address: String,
  service: String,
  notes: String,
  files: [String],
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
