// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   type: { type: String, enum: ['success', 'error', 'warning', 'info'], default: 'info' },
//   orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
//   isRead: { type: Boolean, default: false },
// }, { timestamps: true });

// export default mongoose.model('Notification', notificationSchema);

// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    recipientRole: {
      type: String,
      enum: ['user', 'admin', 'super_admin', 'blog_admin', 'astrologer', 'all'],
      default: 'user',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['success', 'error', 'warning', 'info', 'order', 'user', 'product'],
      default: 'info',
    },
    link: { type: String, default: '' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

notificationSchema.index({ recipientRole: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);