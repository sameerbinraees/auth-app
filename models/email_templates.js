const mongoose = require('mongoose');

const emailTemplatesSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    default: email,
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentJson: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });
module.exports = mongoose.model('EmailTemplates', emailTemplatesSchema);
