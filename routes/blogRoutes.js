// import express from 'express';
// import {
//   createBlog,
//   getBlogs,
//   getBlogBySlug,
//   getAllBlogsAdmin,
//   getBlogById,
//   updateBlog,
//   toggleBlogStatus,
//   deleteBlog,
// } from '../controllers/blogController.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js'; // Aapke existing middleware ke hisaab se
// import upload from '../middleware/uploadMiddleware.js'; // Image upload middleware

// const router = express.Router();

// // ==========================================
// // ✅ PUBLIC ROUTES
// // ==========================================
// router.get('/', getBlogs); // Get all published blogs
// router.get('/:slug', getBlogBySlug); // Get single blog by slug

// // ==========================================
// // ✅ ADMIN ROUTES (Protected)
// // ==========================================

// // Get all blogs for admin (including drafts)
// router.get('/admin/all', protect, adminOnly, getAllBlogsAdmin);

// // Get single blog for editing
// router.get('/admin/:id', protect, adminOnly, getBlogById);

// // Create new blog (with image upload)
// router.post('/admin', protect, adminOnly, upload.single('image'), createBlog);

// // Update blog
// router.put('/admin/:id', protect, adminOnly, upload.single('image'), updateBlog);

// // Toggle publish status
// router.put('/admin/:id/toggle', protect, adminOnly, toggleBlogStatus);

// // Delete blog
// router.delete('/admin/:id', protect, adminOnly, deleteBlog);

// export default router;

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  getBlogById,
  updateBlog,
  toggleBlogStatus,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js'; 
import upload from '../middleware/uploadMiddleware.js'; 

const router = express.Router();

// ==========================================
// ✅ PUBLIC ROUTES
// ==========================================
router.get('/', (req, res, next) => {
    console.log('📥 GET /api/blogs - Fetching all public blogs');
    next();
}, getBlogs); 

router.get('/:slug', (req, res, next) => {
    console.log(`📥 GET /api/blogs/${req.params.slug} - Fetching single blog`);
    next();
}, getBlogBySlug); 

// ==========================================
// ✅ ADMIN ROUTES (Protected)
// ==========================================

router.get('/admin/all', protect, adminOnly, (req, res, next) => {
    console.log('📥 GET /api/blogs/admin/all - Fetching all blogs for admin');
    next();
}, getAllBlogsAdmin);

router.get('/admin/:id', protect, adminOnly, (req, res, next) => {
    console.log(`📥 GET /api/blogs/admin/${req.params.id} - Fetching blog for edit`);
    next();
}, getBlogById);

// ✅ CREATE BLOG (Yahan humne check laga diya hai)
router.post('/admin', protect, adminOnly, (req, res, next) => {
    console.log('📥 POST /api/blogs/admin - Request received for creating blog');
    next();
}, upload.single('image'), (req, res, next) => {
    // ✅ Yeh log batayega ki file aayi ya nahi
    console.log('🔍 UPLOAD MIDDLEWARE RESULT:');
    if (req.file) {
        console.log('✅ File aa gayi:', req.file.path || req.file.secure_url);
    } else {
        console.log('❌ File NAHI aayi (req.file is undefined)');
    }
    next();
}, createBlog);

router.put('/admin/:id', protect, adminOnly, (req, res, next) => {
    console.log(`📥 PUT /api/blogs/admin/${req.params.id} - Request received for updating blog`);
    next();
}, upload.single('image'), (req, res, next) => {
    if (req.file) console.log('✅ Update File aa gayi:', req.file.path);
    next();
}, updateBlog);

router.put('/admin/:id/toggle', protect, adminOnly, (req, res, next) => {
    console.log(`📥 PUT /api/blogs/admin/${req.params.id}/toggle - Toggling status`);
    next();
}, toggleBlogStatus);

router.delete('/admin/:id', protect, adminOnly, (req, res, next) => {
    console.log(`📥 DELETE /api/blogs/admin/${req.params.id} - Deleting blog`);
    next();
}, deleteBlog);

export default router;