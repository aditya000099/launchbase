import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export const sendEmail = (to, subject, text) => {
  const data = {
    from: 'Your SaaS <noreply@yoursaas.com>',
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};
