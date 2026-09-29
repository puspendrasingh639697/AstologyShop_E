// import express from 'express';
// import { createCategory, getCategories } from '../controllers/categoryController.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';
// import upload from '../middleware/uploadMiddleware.js'; // 👈 Agar aapka upload middleware kisi aur folder mein hai, toh uska sahi path yahan dein (jaise '../utils/upload.js' ya '../config/cloudinary.js')

// const router = express.Router();

// router.get('/', getCategories);

// router.post('/add', protect, adminOnly, upload.single('image'), createCategory);

// export default router;

// routes/categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getCategories,
  getAllCategoriesAdmin,
  getCategoryById,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ==========================================
// ✅ PUBLIC ROUTES
// ==========================================

// ✅ Get all active categories (user project ke liye)
router.get('/', getCategories);

// ==========================================
// ✅ ADMIN ROUTES
// ==========================================

// ✅ Get all categories (with inactive + product count)
router.get('/admin/all', protect, adminOnly, getAllCategoriesAdmin);

// ✅ Get single category
router.get('/admin/:id', protect, adminOnly, getCategoryById);

// ✅ Create category (with image upload)
router.post(
  '/admin',
  protect,
  adminOnly,
  upload.single('image'),
  createCategory
);

// ✅ Update category (with image upload)
router.put(
  '/admin/:id',
  protect,
  adminOnly,
  upload.single('image'),
  updateCategory
);

// ✅ Toggle active
router.put('/admin/:id/toggle', protect, adminOnly, toggleCategoryStatus);

// ✅ Delete
router.delete('/admin/:id', protect, adminOnly, deleteCategory);

// ==========================================
// ✅ OLD ROUTE (Backward compatibility)
// ==========================================

router.post(
  '/add',
  protect,
  adminOnly,
  upload.single('image'),
  createCategory
);

export default router;