import express from 'express';
import { updateContent, getContentByType } from '../controllers/contentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js'; 

const router = express.Router();

router.post('/update', protect, adminOnly, upload.single('image'), updateContent);
router.get('/:type', getContentByType);

export default router;