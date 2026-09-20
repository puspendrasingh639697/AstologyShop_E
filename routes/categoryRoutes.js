import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // 👈 Agar aapka upload middleware kisi aur folder mein hai, toh uska sahi path yahan dein (jaise '../utils/upload.js' ya '../config/cloudinary.js')

const router = express.Router();

router.get('/', getCategories);

router.post('/add', protect, adminOnly, upload.single('image'), createCategory);

export default router;