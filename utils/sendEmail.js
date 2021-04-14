const sgMail = require('@sendgrid/mail');

const sendEmail = async (type = null, otp = null) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const html = `OTP for ${type} is <strong>${otp}</strong>`
  const msg = {
    to: 'sameerbinraees@gmail.com',
    from: 'sameerbinraees.dev@gmail.com', // Use the email address or domain you verified above
    subject: 'OTP',
    text: 'and easy to do anywhere, even with Node.js',
    html,
  };
  //ES6
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}



module.exports = {
  sendEmail
}