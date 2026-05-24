const config = require('../config/config');

const fetchClient = global.fetch || require('node-fetch');

if (!config.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY is not configured. Please set it in your environment.');
}

const sendMail = async (options) => {
  try {
    const toRecipients = Array.isArray(options.to)
      ? options.to.map((email) => ({ email }))
      : [{ email: options.to }];

    const payload = {
      sender: {
        name: config.BREVO_SENDER_NAME,
        email: config.BREVO_SENDER_EMAIL || config.EMAIL_USER
      },
      to: toRecipients,
      subject: options.subject,
      htmlContent: options.html,
      textContent: options.text
    };

    if (options.replyTo) {
      payload.replyTo = {
        email: options.replyTo,
        name: options.replyToName || ''
      };
    }

    const response = await fetchClient('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': config.BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const body = await response.text();
    if (!response.ok) {
      throw new Error(`Brevo API error ${response.status}: ${body}`);
    }

    console.log('Brevo email sent successfully');
    return JSON.parse(body || '{}');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = {
  sendMail
};
