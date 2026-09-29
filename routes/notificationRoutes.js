// import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
// import { 
//   getUserNotifications, 
//   markAsRead, 
//   markAllAsRead 
// } from '../controllers/notificationController.js';

// const router = express.Router();

// router.get('/', protect, getUserNotifications);
// router.put('/:id/read', protect, markAsRead);
// router.put('/read-all', protect, markAllAsRead);

// export default router;


// routes/notificationRoutes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getAdminNotifications,
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';

const router = express.Router();

// ✅ Admin routes
router.get('/admin', protect, adminOnly, getAdminNotifications);
router.get('/unread-count', protect, adminOnly, getUnreadCount);

// ✅ User routes
router.get('/', protect, getUserNotifications);

// ✅ Common
router.put('/:id/read', protect, markAsRead);
router.put('/read-all', protect, markAllAsRead);
router.delete('/:id', protect, deleteNotification);

export default router;