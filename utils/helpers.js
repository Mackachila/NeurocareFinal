const crypto = require('crypto');

const generateRandomKey = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

module.exports = { generateRandomKey };