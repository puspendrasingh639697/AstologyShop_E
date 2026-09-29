// // routes/returnRoutes.js
// import express from 'express';
// import {
//   createReturnRequest,
//   getMyReturns,
//   getAllReturns,
//   getReturnById,
//   approveReturn,
//   rejectReturn,
//   processRefund,
//   getReturnStats,
// } from '../controllers/returnController.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ==========================================
// // ✅ USER ROUTES
// // ==========================================
// router.post('/', protect, createReturnRequest);
// router.get('/my', protect, getMyReturns);

// // ==========================================
// // ✅ ADMIN ROUTES
// // ==========================================
// router.get('/admin/all', protect, adminOnly, getAllReturns);
// router.get('/admin/stats', protect, adminOnly, getReturnStats);
// router.get('/admin/:id', protect, adminOnly, getReturnById);
// router.put('/admin/:id/approve', protect, adminOnly, approveReturn);
// router.put('/admin/:id/reject', protect, adminOnly, rejectReturn);
// router.put('/admin/:id/refund', protect, adminOnly, processRefund);

// export default router;

// routes/returnRoutes.js
import express from 'express';
import {
  createReturnRequest,
  getMyReturns,
  getAllReturns,
  getReturnById,
  approveReturn,
  rejectReturn,
  processRefund,
  getReturnStats,
} from '../controllers/returnController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================================
// ✅ USER ROUTES
// ==========================================
router.post('/', protect, createReturnRequest);
// router.get('/my', protect, getMyReturns);
router.get('/my-returns', protect, getMyReturns);

// ==========================================
// ✅ ADMIN ROUTES
// ==========================================
router.get('/admin/all', protect, adminOnly, getAllReturns);
router.get('/admin/stats', protect, adminOnly, getReturnStats);
router.get('/admin/:id', protect, adminOnly, getReturnById);
router.put('/admin/:id/approve', protect, adminOnly, approveReturn);
router.put('/admin/:id/reject', protect, adminOnly, rejectReturn);
router.put('/admin/:id/refund', protect, adminOnly, processRefund);

export default router;