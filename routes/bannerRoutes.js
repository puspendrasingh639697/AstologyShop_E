// routes/bannerRoutes.js
import express from 'express';
import {
  getAllBanners,
  getActiveBanners,
  getBannerById,
  createBanner,
  updateBanner,
  toggleBannerStatus,
  deleteBanner,
} from '../controllers/bannerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Public route (user project ke liye)
router.get('/active', getActiveBanners);

// ✅ Admin routes
router.get('/admin/all', protect, adminOnly, getAllBanners);
router.get('/admin/:id', protect, adminOnly, getBannerById);
router.post('/admin', protect, adminOnly, createBanner);
router.put('/admin/:id', protect, adminOnly, updateBanner);
router.put('/admin/:id/toggle', protect, adminOnly, toggleBannerStatus);
router.delete('/admin/:id', protect, adminOnly, deleteBanner);

export default router;