// // // routes/adminRoutes.js
// // import express from 'express';
// // import { 
// //     getAllUsers, 
// //     getAllOrders, 
// //     updateOrderStatus,
// //     deleteUser 
// // } from '../controllers/adminController.js';
// // import { protect, adminOnly } from '../middleware/authMiddleware.js';

// // const router = express.Router();

// // // ✅ Sab routes Admin ke liye (protect + adminOnly)
// // router.get('/users', protect, adminOnly, getAllUsers);
// // router.get('/orders', protect, adminOnly, getAllOrders);
// // router.put('/orders/:id', protect, adminOnly, updateOrderStatus);
// // router.delete('/users/:id', protect, adminOnly, deleteUser);

// // export default router;



// // routes/adminRoutes.js
// import express from 'express';
// import { 
//     getAllUsers, 
//     getAllOrders, 
//     updateOrderStatus,
//     deleteUser,
//     getDashboardStats,
//     makeAdmin,
//     removeAdmin,
//     toggleBlockUser,
//     getChartData,
//     getOrderById,
//     createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductById,
//    uploadImage,
//     getUserById,
//      getLowStockProducts,
//   updateProductStock,
//     getTopProducts,
//      userGrowth,
// } from '../controllers/adminController.js';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';
// import { superAdminOnly } from '../middleware/adminMiddleware.js';
// import upload from '../middleware/uploadMiddleware.js';


// const router = express.Router();

// // ✅ Dashboard Stats (Admin + Super Admin)
// router.get('/stats', protect, adminOnly, getDashboardStats);
// router.get('/stats/charts', protect, adminOnly, getChartData);
// router.get('/stats/top-products', protect, adminOnly, getTopProducts);
// router.get('/orders/:id', protect, adminOnly, getOrderById);
// router.post('/products', protect, adminOnly, createProduct);
// router.get('/products/low-stock', protect, adminOnly, getLowStockProducts);
// router.put('/products/:id/stock', protect, adminOnly, updateProductStock);
// router.get('/products/:id', protect, adminOnly, getProductById);
// router.put('/products/:id', protect, adminOnly, updateProduct);
// router.delete('/products/:id', protect, adminOnly, deleteProduct);
// router.post('/upload', protect, adminOnly, upload.single('image'), uploadImage);

// // ✅ Users (Admin + Super Admin)
// router.get('/users', protect, adminOnly, getAllUsers);
// router.get('/users/:id', protect, adminOnly, getUserById); 
// router.delete('/users/:id', protect, adminOnly, deleteUser);

// router.put('/users/:id/block', protect, adminOnly, toggleBlockUser);

// // ✅ Orders (Admin + Super Admin)
// router.get('/orders', protect, adminOnly, getAllOrders);
// router.put('/orders/:id', protect, adminOnly, updateOrderStatus);

// // ✅ Make/Remove Admin (Only Super Admin)
// router.put('/make-admin/:id', protect, superAdminOnly, makeAdmin);
// router.put('/remove-admin/:id', protect, superAdminOnly, removeAdmin);

// export default router;

// routes/adminRoutes.js
import express from 'express';
import {
  // ✅ Users
  getAllUsers,
  getUserById,
  deleteUser,
  toggleBlockUser,
  makeAdmin,
  removeAdmin,

  // ✅ Orders
  getAllOrders,
  getOrderById,
  updateOrderStatus,

  // ✅ Products
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getLowStockProducts,
  updateProductStock,
  uploadImage,

  // ✅ Dashboard & Charts
  getDashboardStats,
  getChartData,
  getTopProducts,
  getUserGrowth,     // ✅ YEH SAHI HAI
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { superAdminOnly } from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ==========================================
// ✅ DASHBOARD STATS
// ==========================================
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/stats/charts', protect, adminOnly, getChartData);
router.get('/stats/top-products', protect, adminOnly, getTopProducts);
router.get('/stats/user-growth', protect, adminOnly, getUserGrowth);   // ✅ ADD

// ==========================================
// ✅ USERS
// ==========================================
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/users/:id', protect, adminOnly, getUserById);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.put('/users/:id/block', protect, adminOnly, toggleBlockUser);

// ==========================================
// ✅ ORDERS
// ==========================================
router.get('/orders', protect, adminOnly, getAllOrders);
router.get('/orders/:id', protect, adminOnly, getOrderById);
router.put('/orders/:id', protect, adminOnly, updateOrderStatus);

// ==========================================
// ✅ PRODUCTS
// ==========================================
router.post('/products', protect, adminOnly, createProduct);
router.get('/products/low-stock', protect, adminOnly, getLowStockProducts);
router.put('/products/:id/stock', protect, adminOnly, updateProductStock);
router.get('/products/:id', protect, adminOnly, getProductById);
router.put('/products/:id', protect, adminOnly, updateProduct);
router.delete('/products/:id', protect, adminOnly, deleteProduct);
router.post('/upload', protect, adminOnly, upload.single('image'), uploadImage);

// ==========================================
// ✅ SUPER ADMIN ONLY
// ==========================================
router.put('/make-admin/:id', protect, superAdminOnly, makeAdmin);
router.put('/remove-admin/:id', protect, superAdminOnly, removeAdmin);

export default router;