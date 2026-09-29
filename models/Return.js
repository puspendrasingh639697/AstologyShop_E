// models/Return.js
import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema(
  {
    // ✅ Order reference
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ✅ Return items
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String, required: true },
        image: { type: String, default: '' },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],

    // ✅ Return reason
    reason: {
      type: String,
      required: true,
      enum: [
        'Damaged Product',
        'Wrong Item',
        'Not as Described',
        'Size/Fit Issue',
        'Quality Issue',
        'Changed Mind',
        'Other',
      ],
    },
    description: { type: String, default: '' },

    // ✅ Return images (optional)
    images: [{ type: String }],

    // ✅ Refund amount
    refundAmount: { type: Number, required: true },

    // ✅ Status
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },

    // ✅ Admin response
    adminNote: { type: String, default: '' },
    processedAt: { type: Date, default: null },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    // ✅ Refund details
    refundMethod: {
      type: String,
      enum: ['Razorpay', 'Bank Transfer', 'UPI', 'Original Payment Method'],
      default: 'Original Payment Method',
    },
    refundStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    refundTransactionId: { type: String, default: '' },
    refundedAt: { type: Date, default: null },

    // ✅ Replacement / Refund
    returnType: {
      type: String,
      enum: ['Refund', 'Replacement'],
      default: 'Refund',
    },
  },
  { timestamps: true }
);

// ✅ Index for fast queries
returnSchema.index({ user: 1, status: 1, createdAt: -1 });
returnSchema.index({ order: 1 });

export default mongoose.model('Return', returnSchema);