// src/services/NotificationService.js
const Notification = require('../models/Notification.model');

class NotificationService {
  static async sendNotification({ title, message, recipientRole, recipientIds, sentBy }) {
    const notification = await Notification.create({
      title,
      message,
      recipientRole,
      recipientIds,
      sentBy,
      isActive: true
    });

    // Optionally, trigger real-time push via WebSocket or email
    return notification;
  }
}

module.exports = NotificationService;
