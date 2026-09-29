// import express from 'express';
// import { 
//     getProducts,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     createProductReview,
//     getProductReviews,
//     searchProducts,
//     getPopularProducts,
//     getRelatedProducts
// } from '../controllers/productController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
// import upload from '../middleware/uploadMiddleware.js';
// import {  validateId } from '../middleware/validationMiddleware.js';

// const router = express.Router();

// // =======================
// //   PUBLIC ROUTES
// // =======================
// router.get('/all', getProducts);           // List all products
// router.get('/search', searchProducts);      // Search products by keyword/category
// router.get('/popular', getPopularProducts); // Popular products for Home page
// router.get('/:id', validateId, getProductById); // Get single product details
// router.get('/:id/related', validateId, getRelatedProducts); // Related products
// router.get('/:id/reviews', validateId, getProductReviews);   // Get all reviews

// // =======================
// //   REVIEWS ROUTES (PROTECTED)
// // =======================
// // Add a review (User must be logged in)
// router.post('/:id/reviews', protect, validateId, createProductReview);

// // =======================
// //   PROTECTED ADMIN ROUTES (RBAC)
// // =======================

// // Add Product
// router.post(
//     '/add', 
//     protect, 
//     restrictTo('super_admin', 'admin', 'manager', 'editor'), 
//     upload.single('image'), 
//     // validateProduct,
//     addProduct
// );

// // Update Product
// router.put(
//     '/:id', 
//     protect, 
//     restrictTo('super_admin', 'admin', 'manager', 'editor'), 
//     upload.single('image'), 
//     validateId,
//     // validateProduct,
//     updateProduct
// );

// // Delete Product
// router.delete(
//     '/:id', 
//     protect, 
//     restrictTo('super_admin', 'admin'), 
//     validateId,
//     deleteProduct
// );

// export default router;


import express from 'express';
import {
    getProducts,
    getProductById,
    getProductBySlug,   // ✅ ADD karo
    addProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    searchProducts,
    getPopularProducts,
    getRelatedProducts
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { validateId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// =======================
//   PUBLIC ROUTES
// =======================
router.get('/all', getProducts);
router.get('/search', searchProducts);
router.get('/popular', getPopularProducts);

// ✅ SPECIFIC ROUTES pehle (ORDER IMPORTANT)
router.get('/slug/:slug', getProductBySlug);   // ← YEH ADD KARO

// ✅ Generic ID route sabse aakhir mein
router.get('/:id', validateId, getProductById);
router.get('/:id/related', validateId, getRelatedProducts);
router.get('/:id/reviews', validateId, getProductReviews);

// =======================
//   REVIEWS ROUTES (PROTECTED)
// =======================
router.post('/:id/reviews', protect, validateId, createProductReview);

// =======================
//   PROTECTED ADMIN ROUTES
// =======================
router.post(
    '/add',
    protect,
    restrictTo('super_admin', 'admin', 'manager', 'editor'),
    upload.single('image'),
    addProduct
);

router.put(
    '/:id',
    protect,
    restrictTo('super_admin', 'admin', 'manager', 'editor'),
    upload.single('image'),
    validateId,
    updateProduct
);

router.delete(
    '/:id',
    protect,
    restrictTo('super_admin', 'admin'),
    validateId,
    deleteProduct
);

export default router;