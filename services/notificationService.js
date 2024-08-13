const primaryEmailService = require('./primaryEmailService');
const backupEmailService = require('./backupEmailService');

const RETRY_LIMIT = 3;
const RETRY_INTERVAL = [1, 5, 15]; // in minutes

const sendNotification = async (to, subject, text, urgency, activity) => {
  let retryCount = 0;
  let emailSent = false;

  const send = async (service) => {
    try {
      await service.sendEmail(to, subject, text);
      emailSent = true;
    } catch (error) {
      throw error;
    }
  };

  while (!emailSent && retryCount < RETRY_LIMIT) {
    try {
      if (retryCount < 1) {
        await send(primaryEmailService);
      } else {
        await send(backupEmailService);
      }
      emailSent = true;
    } catch (error) {
      retryCount++;
      if (retryCount < RETRY_LIMIT) {
        console.log(`Retrying in ${RETRY_INTERVAL[retryCount - 1]} minutes...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL[retryCount - 1] * 60 * 1000));
      } else {
        console.log('Email delivery failed after maximum retries.');
      }
    }
  }
};

const getSendTime = (urgency, activity) => {
  const times = {
    high: activity === 'active' ? 0 : 30 * 60 * 1000,
    medium: 60 * 60 * 1000,
    low: 2 * 60 * 60 * 1000,
  };
  return times[urgency] || 0;
};

module.exports = { sendNotification, getSendTime };
