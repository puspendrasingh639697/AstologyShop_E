// routes/exportRoutes.js
import express from 'express';
import {
  exportUsers,
  exportOrders,
  exportProducts,
} from '../controllers/exportController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Export routes (Admin only)
router.get('/users', protect, adminOnly, exportUsers);
router.get('/orders', protect, adminOnly, exportOrders);
router.get('/products', protect, adminOnly, exportProducts);

export default router;