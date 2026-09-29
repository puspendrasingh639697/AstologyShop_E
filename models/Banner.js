// models/Banner.js
import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    link: {
      type: String,
      default: '',  // e.g. /products/yantra
    },
    buttonText: {
      type: String,
      default: 'Shop Now',
    },
    position: {
      type: String,
      enum: ['hero', 'middle', 'bottom', 'sidebar'],
      default: 'hero',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Index for fast queries
bannerSchema.index({ position: 1, isActive: 1, displayOrder: 1 });

export default mongoose.model('Banner', bannerSchema);