const express = require('express');
const { sendNotification, getSendTime } = require('../services/notificationService');
const router = express.Router();

router.post('/notify', async (req, res) => {
  const { to, subject, text, urgency, activity } = req.body;

  if (!to || !subject || !text || !urgency || !activity) {
    return res.status(400).send('Missing required fields');
  }

  const sendTime = getSendTime(urgency, activity);
  setTimeout(async () => {
    await sendNotification(to, subject, text, urgency, activity);
  }, sendTime);

  res.send('Notification scheduled');
});

module.exports = router;
