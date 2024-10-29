import mailgun from 'mailgun-js';
import templates from './email-templates';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

export async function sendEmail(type, to, data) {
  const template = templates[type];
  
  if (!template) throw new Error('Email template not found');

  const emailData = {
    from: 'Launch Base <noreply@launchbase.com>',
    to,
    subject: template.subject,
    html: template.html(data)
  };

  try {
    await mg.messages().send(emailData);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
} 