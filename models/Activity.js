// models/Activity.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    // ✅ Who did it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: { type: String, default: '' },
    userRole: { type: String, default: '' },

    // ✅ What they did
    action: {
      type: String,
      required: true,
      enum: [
        'LOGIN',
        'LOGOUT',
        'CREATE',
        'UPDATE',
        'DELETE',
        'APPROVE',
        'REJECT',
        'REFUND',
        'EXPORT',
        'BLOCK',
        'UNBLOCK',
        'MAKE_ADMIN',
        'REMOVE_ADMIN',
        'TOGGLE',
        'STOCK_UPDATE',
        'VIEW',
      ],
    },

    // ✅ On what
    targetModel: {
      type: String,
      enum: ['User', 'Product', 'Order', 'Review', 'Banner', 'Category', 'Return', 'Settings', 'Auth', 'Other'],
      default: 'Other',
    },
    targetId: { type: mongoose.Schema.Types.ObjectId, default: null },
    targetName: { type: String, default: '' },

    // ✅ Description
    description: { type: String, default: '' },

    // ✅ Details (JSON)
    details: { type: mongoose.Schema.Types.Mixed, default: {} },

    // ✅ Request info
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },

    // ✅ Status
    status: {
      type: String,
      enum: ['success', 'failed'],
      default: 'success',
    },
  },
  { timestamps: true }
);

// ✅ Index for fast queries
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ action: 1, createdAt: -1 });
activitySchema.index({ targetModel: 1, createdAt: -1 });

export default mongoose.model('Activity', activitySchema);