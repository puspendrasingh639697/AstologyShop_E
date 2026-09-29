// routes/settingsRoutes.js
import express from 'express';
import {
  getSettings,
  updateSettings,
  addCoupon,
  deleteCoupon,
} from '../controllers/settingsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Public — frontend ko settings chahiye
router.get('/', getSettings);

// ✅ Admin only
router.put('/', protect, adminOnly, updateSettings);
router.post('/coupons', protect, adminOnly, addCoupon);
router.delete('/coupons/:code', protect, adminOnly, deleteCoupon);

export default router;