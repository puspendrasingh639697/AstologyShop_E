

// import express from 'express';
// import {
//   addReview,
//   getReviewsByTarget,
//   deleteReview,
//   getAllReviews,
//   approveReview,
//   rejectReview,
//   replyToReview,
// } from '../controllers/reviewController.js';
// import { protect, restrictTo, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ==========================================
// // ✅ EXISTING ROUTES (Same rahenge)
// // ==========================================

// // Public route
// router.get('/:targetId', getReviewsByTarget);

// // Protected routes
// router.post('/add', protect, restrictTo('user', 'customer', 'astrologer', 'admin', 'super_admin'), addReview);
// router.delete('/:id', protect, deleteReview);

// // ==========================================
// // ✅ NEW ADMIN ROUTES
// // ==========================================

// router.get('/admin/all', protect, adminOnly, getAllReviews);
// router.put('/admin/:id/approve', protect, adminOnly, approveReview);
// router.put('/admin/:id/reject', protect, adminOnly, rejectReview);
// router.post('/admin/:id/reply', protect, adminOnly, replyToReview);

// export default router;


import express from 'express';
import {
  addReview,
  getReviewsByTarget,
  deleteReview,
  getAllReviews,
  getMyReviews,        // ✅ ADD karo
  approveReview,
  rejectReview,
  replyToReview,
} from '../controllers/reviewController.js';
import { protect, restrictTo, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================================
// ✅ PUBLIC ROUTES
// ==========================================
// ⚠️ Specific routes PEHLE aane chahiye, generic `/:targetId` LAST mein

// ==========================================
// ✅ USER ROUTES (Protected)
// ==========================================
router.get('/my-reviews', protect, getMyReviews);    // ← YEH ADD KARO
router.post('/add', protect, restrictTo('user', 'customer', 'astrologer', 'admin', 'super_admin'), addReview);
router.delete('/:id', protect, deleteReview);

// ==========================================
// ✅ ADMIN ROUTES
// ==========================================
router.get('/admin/all', protect, adminOnly, getAllReviews);
router.put('/admin/:id/approve', protect, adminOnly, approveReview);
router.put('/admin/:id/reject', protect, adminOnly, rejectReview);
router.post('/admin/:id/reply', protect, adminOnly, replyToReview);

// ==========================================
// ✅ PUBLIC ROUTE (LAST mein — generic)
// ==========================================
router.get('/:targetId', getReviewsByTarget);

export default router;