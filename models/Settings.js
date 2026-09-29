// models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    // ✅ General
    siteName: { type: String, default: 'Poja Hetu' },
    siteTagline: { type: String, default: 'Sacred Puja Essentials' },
    siteLogo: { type: String, default: '' },

    // ✅ Contact
    contactEmail: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    contactAddress: { type: String, default: '' },

    // ✅ Shipping
    standardShippingCharge: { type: Number, default: 99 },
    expressShippingCharge: { type: Number, default: 199 },
    freeShippingThreshold: { type: Number, default: 999 },

    // ✅ Payment
    codEnabled: { type: Boolean, default: true },
    razorpayEnabled: { type: Boolean, default: true },
    razorpayKeyId: { type: String, default: '' },

    // ✅ Social
    facebookUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },

    // ✅ Coupons
    coupons: [
      {
        code: { type: String, required: true, uppercase: true },
        discountType: {
          type: String,
          enum: ['percentage', 'fixed'],
          default: 'percentage',
        },
        discountValue: { type: Number, required: true },
        minOrderAmount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        expiresAt: { type: Date, default: null },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);