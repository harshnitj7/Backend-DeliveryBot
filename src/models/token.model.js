const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300   // optional: auto-delete after 5 min
  }
});

module.exports = mongoose.model('Token', tokenSchema);
