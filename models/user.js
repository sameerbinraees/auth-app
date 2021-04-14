const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      default: null,
    },
    googleLogin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return this.googleLogin !== true;
        },
        'password is required if google login is true',
      ],

      // required: function () {
      //   return this.googleLogin !== true;
      // }, // Only required if a equals 'test'

      // required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
      default: null,
    },
    emailVerificationExpiry: {
      type: Date,
      default: null,
    },
    resetPasswordCode: {
      type: String,
      default: null,
    },
    resetPasswordExpiry: {
      type: Date,
      default: null,
    },
    MFAStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
