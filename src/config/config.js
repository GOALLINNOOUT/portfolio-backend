require('dotenv').config();

function normalizeOrigin(value) {
  return value.trim().replace(/\/+$/, '');
}

function parseList(value) {
  return (value || '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DEBUG: process.env.DEBUG === 'true',
  CLIENT_URL: process.env.CLIENT_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGINS: [
    ...parseList(process.env.CORS_ORIGINS),
    ...parseList(process.env.CORS_ORIGIN),
    ...parseList(process.env.CLIENT_URL),
    ...parseList(process.env.FRONTEND_URL)
  ],

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,

  BREVO_API_KEY: process.env.BREVO_API_KEY,
  BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME || 'Portfolio Contact'
};
