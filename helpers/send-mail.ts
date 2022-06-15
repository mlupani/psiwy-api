const sendgrid = require('@sendgrid/mail');

const sendMail = async (email: string, subject: string, text: string) => {
  const msg = {
    to: email,
    from: 'mlupani2@gmail.com',
    subject,
    text
  };
  sendgrid
    .send(msg)
    .then((resp: any) => {
      console.log('Email sent\n', resp);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

module.exports = {
  sendMail
};
