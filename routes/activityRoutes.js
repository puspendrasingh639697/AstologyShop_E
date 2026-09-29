// routes/activityRoutes.js
import express from 'express';
import {
  getAllActivities,
  getActivityStats,
  deleteOldActivities,
  deleteActivity,
  clearAllActivities,
} from '../controllers/activityController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { superAdminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ✅ Admin routes
router.get('/', protect, adminOnly, getAllActivities);
router.get('/stats', protect, adminOnly, getActivityStats);
router.delete('/cleanup', protect, adminOnly, deleteOldActivities);
router.delete('/:id', protect, adminOnly, deleteActivity);

// ✅ Super Admin only
router.delete('/', protect, superAdminOnly, clearAllActivities);

export default router;