// // // controllers/adminController.js
// // import User from '../models/User.js';
// // import Order from '../models/Order.js';

// // // ✅ Get all users (Admin only)
// // export const getAllUsers = async (req, res) => {
// //     console.log("--- Admin: Fetching All Users ---");
// //     try {
// //         const users = await User.find().select('-password'); // Password hide karo
// //         console.log(`✅ Total ${users.length} users found`);
// //         res.status(200).json(users);
// //     } catch (error) {
// //         console.log("🔥 Error fetching users:", error.message);
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // ✅ Get all orders (Admin only)
// // export const getAllOrders = async (req, res) => {
// //     console.log("--- Admin: Fetching All Orders ---");
// //     try {
// //         const orders = await Order.find()
// //             .populate('user', 'name email') // User details bhi chahiye
// //             .sort({ createdAt: -1 });
// //         console.log(`✅ Total ${orders.length} orders found`);
// //         res.status(200).json(orders);
// //     } catch (error) {
// //         console.log("🔥 Error fetching orders:", error.message);
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // ✅ Update order status (Admin only)
// // export const updateOrderStatus = async (req, res) => {
// //     try {
// //         const { status } = req.body;
// //         const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('user', 'email');
        
// //         if (!order) return res.status(404).json({ message: "Order not found" });

// //         // Shipping Update Notification (Point 3.11)
// //         if (status === 'Shipped') {
// //             await sendEmail({
// //                 email: order.user.email,
// //                 subject: "Your Order is on the way! 🚚",
// //                 message: `Great news! Your order ${order._id} has been shipped.`
// //             });
// //         }

// //         res.status(200).json({ message: "Status updated!", order });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // ✅ Delete user (Admin only)
// // export const deleteUser = async (req, res) => {
// //     console.log("--- Admin: Deleting User ---");
// //     try {
// //         const user = await User.findByIdAndDelete(req.params.id);
// //         if (!user) {
// //             return res.status(404).json({ message: "User not found" });
// //         }
// //         console.log(`✅ User ${user.email} deleted`);
// //         res.status(200).json({ message: "User deleted successfully" });
// //     } catch (error) {
// //         console.log("🔥 Error deleting user:", error.message);
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// // controllers/adminController.js
// import User from '../models/User.js';
// import Order from '../models/Order.js';
// import Product from '../models/Product.js';   // ✅ ADD kiya

// // ✅ Get all users (Admin only)
// export const getAllUsers = async (req, res) => {
//     console.log("--- Admin: Fetching All Users ---");
//     try {
//         const users = await User.find().select('-password');
//         console.log(`✅ Total ${users.length} users found`);
//         res.status(200).json({ success: true, users });   // ✅ { success, users }
//     } catch (error) {
//         console.log("🔥 Error fetching users:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Get all orders (Admin only)
// export const getAllOrders = async (req, res) => {
//     console.log("--- Admin: Fetching All Orders ---");
//     try {
//         const orders = await Order.find()
//             .populate('user', 'name email')
//             .sort({ createdAt: -1 });
//         console.log(`✅ Total ${orders.length} orders found`);
//         res.status(200).json({ success: true, orders });   // ✅ { success, orders }
//     } catch (error) {
//         console.log("🔥 Error fetching orders:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Update order status (Admin only)
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const order = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status },
//             { new: true }
//         ).populate('user', 'email');

//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         res.status(200).json({ success: true, message: "Status updated!", order });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Delete user (Admin only)
// export const deleteUser = async (req, res) => {
//     console.log("--- Admin: Deleting User ---");
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         console.log(`✅ User ${user.email} deleted`);
//         res.status(200).json({ success: true, message: "User deleted successfully" });
//     } catch (error) {
//         console.log("🔥 Error deleting user:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Dashboard Stats (Admin + Super Admin) — NAYA
// export const getDashboardStats = async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments({ role: 'user' });
//         const totalOrders = await Order.countDocuments({});
//         const totalProducts = await Product.countDocuments({});
//         const totalAdmins = await User.countDocuments({ role: 'admin' });
//         const totalBlogAdmins = await User.countDocuments({ role: 'blog_admin' });

//         const totalRevenue = await Order.aggregate([
//             { $match: { status: { $ne: 'Cancelled' } } },
//             { $group: { _id: null, total: { $sum: '$totalPrice' } } }
//         ]);

//         res.status(200).json({
//             success: true,
//             stats: {
//                 totalUsers,
//                 totalOrders,
//                 totalProducts,
//                 totalAdmins,
//                 totalBlogAdmins,
//                 totalRevenue: totalRevenue[0]?.total || 0
//             }
//         });
//     } catch (error) {
//         console.log("🔥 Error fetching stats:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Make user an Admin (Super Admin only) — NAYA
// export const makeAdmin = async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(
//             req.params.id,
//             { role: 'admin' },
//             { new: true }
//         ).select('-password');

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'User promoted to Admin',
//             user
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Remove Admin (Super Admin only) — NAYA
// export const removeAdmin = async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(
//             req.params.id,
//             { role: 'user' },
//             { new: true }
//         ).select('-password');

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Admin removed',
//             user
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Block/Unblock user (Admin + Super Admin) — NAYA
// export const toggleBlockUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         user.isActive = !user.isActive;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: user.isActive ? 'User unblocked' : 'User blocked',
//             user: { _id: user._id, isActive: user.isActive }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // ✅ Chart Data
// export const getChartData = async (req, res) => {
//   try {
//     // Monthly Revenue (last 6 months)
//     const monthlyRevenue = await Order.aggregate([
//       {
//         $match: {
//           status: { $ne: 'Cancelled' },
//           createdAt: {
//             $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: '$createdAt' },
//           revenue: { $sum: '$totalPrice' },
//           orders: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     // Order Status Distribution
//     const orderStatus = await Order.aggregate([
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       monthlyRevenue,
//       orderStatus
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate('user', 'name email phone')
//       .populate('orderItems.productId', 'name image price');   // ✅ yeh add karein

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     // ✅ Manual mapping — image fallback ke saath
//     const orderObj = order.toObject();
//     orderObj.orderItems = orderObj.orderItems.map((item) => ({
//       ...item,
//       image: item.image || item.productId?.image || '',
//     }));

//     res.json({ success: true, order: orderObj });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




// // ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, image, category, stock } = req.body;

//     if (!name || !price || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, price, and image are required'
//       });
//     }

//     const product = await Product.create({
//       name,
//       price,
//       description: description || '',
//       image,
//       category: category || null,
//       stock: stock || 0,
//     });

//     res.status(201).json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     res.json({ success: true, message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get Single Product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// // ✅ Upload Image to Cloudinary
// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'No file uploaded' 
//       });
//     }

//     // Buffer ko base64 mein convert karein
//     const b64 = Buffer.from(req.file.buffer).toString('base64');
//     const dataURI = `data:${req.file.mimetype};base64,${b64}`;

//     // Cloudinary par upload
//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: 'product_images',
//       resource_type: 'image',
//     });

//     res.json({
//       success: true,
//       imageUrl: result.secure_url,
//       publicId: result.public_id,
//     });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/adminController.js
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
// import cloudinary from '../config/cloudinary.js'; 
//   // ✅ ADD kiya

// // ✅ Get all users
// export const getAllUsers = async (req, res) => {
//   console.log("--- Admin: Fetching All Users ---");
//   try {
//     const users = await User.find().select('-password');
//     console.log(`✅ Total ${users.length} users found`);
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.log("🔥 Error fetching users:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// ✅ Get all users (with pagination)
// ✅ Get all users (with pagination)
export const getAllUsers = async (req, res) => {
  console.log("--- Admin: Fetching All Users ---");
  try {
    // ✅ Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // ✅ Build filter
    const filter = {};

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Role filter
    if (role) {
      filter.role = role;
    }

    // ✅ Status filter — FIXED
    if (status === 'active') {
      // ✅ Active = isActive true OR isActive field missing
      filter.$and = [
        {
          $or: [
            { isActive: true },
            { isActive: { $exists: false } },
            { isActive: null },
          ],
        },
      ];
    }
    if (status === 'blocked') {
      filter.isActive = false;
    }

    // ✅ Get total count
    const totalUsers = await User.countDocuments(filter);

    // ✅ Get paginated users
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(`✅ Page ${page}: ${users.length} users (Total: ${totalUsers})`);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        limit,
        hasNextPage: page < Math.ceil(totalUsers / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("🔥 Error fetching users:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get all orders
// export const getAllOrders = async (req, res) => {
//   console.log("--- Admin: Fetching All Orders ---");
//   try {
//     const orders = await Order.find()
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
//     console.log(`✅ Total ${orders.length} orders found`);
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.log("🔥 Error fetching orders:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // ✅ Get all orders (with pagination)
// export const getAllOrders = async (req, res) => {
//   console.log("--- Admin: Fetching All Orders ---");
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const search = req.query.search || '';
//     const status = req.query.status || '';

//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (status) filter.status = status;

//     // ✅ Search by order ID
//     if (search) {
//       filter._id = { $regex: search, $options: 'i' };
//     }

//     const totalOrders = await Order.countDocuments(filter);

//     const orders = await Order.find(filter)
//       .populate('user', 'name email phone')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     console.log(`✅ Page ${page}: ${orders.length} orders (Total: ${totalOrders})`);

//     res.status(200).json({
//       success: true,
//       orders,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalOrders / limit),
//         totalOrders,
//         limit,
//         hasNextPage: page < Math.ceil(totalOrders / limit),
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (error) {
//     console.log("🔥 Error fetching orders:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// ✅ Get all orders (with pagination)
export const getAllOrders = async (req, res) => {
  console.log("--- Admin: Fetching All Orders ---");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { 'shippingAddress.street': { $regex: search, $options: 'i' } },
        { 'shippingAddress.city': { $regex: search, $options: 'i' } },
      ];
    }

    const totalOrders = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(`✅ Page ${page}: ${orders.length} orders (Total: ${totalOrders})`);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        limit,
        hasNextPage: page < Math.ceil(totalOrders / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("🔥 Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'email');

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Status updated!", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  console.log("--- Admin: Deleting User ---");
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(`✅ User ${user.email} deleted`);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log("🔥 Error deleting user:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalBlogAdmins = await User.countDocuments({ role: 'blog_admin' });

    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalAdmins,
        totalBlogAdmins,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.log("🔥 Error fetching stats:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Make user an Admin
export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: 'User promoted to Admin',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Remove Admin
export const removeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'user' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: 'Admin removed',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Block/Unblock user
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isActive ? 'User unblocked' : 'User blocked',
      user: { _id: user._id, isActive: user.isActive }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // ✅ Chart Data
// export const getChartData = async (req, res) => {
//   try {
//     const monthlyRevenue = await Order.aggregate([
//       {
//         $match: {
//           status: { $ne: 'Cancelled' },
//           createdAt: {
//             $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: '$createdAt' },
//           revenue: { $sum: '$totalPrice' },
//           orders: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const orderStatus = await Order.aggregate([
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       monthlyRevenue,
//       orderStatus
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


export const getChartData = async (req, res) => {
  try {
    // Monthly Revenue
    const monthlyRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' }, createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) } } },
      { $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$totalPrice' }, orders: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Order Status
    const orderStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Top Products
    const topProducts = await Order.aggregate([
      { $match: { status: { $nin: ['Cancelled', 'Returned'] } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.productId',
          name: { $first: '$orderItems.name' },
          image: { $first: '$orderItems.image' },
          price: { $first: '$orderItems.price' },
          totalQty: { $sum: '$orderItems.qty' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] } },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { totalQty: -1 } },
      { $limit: 5 },
    ]);

    // ✅ User Growth
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const userGrowthRaw = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userGrowth = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;

      const found = userGrowthRaw.find(
        (item) => item._id.year === year && item._id.month === month
      );

      userGrowth.push({
        month: monthNames[month - 1],
        count: found ? found.count : 0,
      });
    }

    res.json({
      success: true,
      monthlyRevenue,
      orderStatus,
      topProducts,
      userGrowth,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Get Single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.productId', 'name image price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const orderObj = order.toObject();
    orderObj.orderItems = orderObj.orderItems.map((item) => ({
      ...item,
      image: item.productId?.image || item.image || '',   // ✅ Priority fix
    }));

    res.json({ success: true, order: orderObj });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, image, category, stock } = req.body;

//     if (!name || !price || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, price, and image are required',
//       });
//     }

//     // ✅ Auto-generate slug from name
//     const slug = name
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → dash
//       .replace(/^-+|-+$/g, '');       // leading/trailing dash remove

//     // ✅ Check if slug already exists
//     const existingProduct = await Product.findOne({ slug });
//     if (existingProduct) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product with this name already exists',
//       });
//     }

//     const product = await Product.create({
//       name,
//       slug,                          // ✅ auto-generated
//       price: Number(price),
//       description: description || '',
//       image,
//       category: category || null,
//       stock: Number(stock) || 0,
//     });

//     res.status(201).json({ success: true, product });
//   } catch (err) {
//     console.log('🔥 Error creating product:', err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, image, category, stock } = req.body;

//     // ✅ DEBUG LOGS — Frontend se aaya hua data
//     console.log("🔍 CREATE — IMAGE FROM FRONTEND:", image);
//     console.log("🔍 CREATE — DOTS COUNT:", (image?.match(/\./g) || []).length);
//     console.log("🔍 CREATE — FULL BODY:", JSON.stringify(req.body, null, 2));

//     if (!name || !price || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, price, and image are required',
//       });
//     }

//     // ✅ Auto-generate slug from name
//     const slug = name
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → dash
//       .replace(/^-+|-+$/g, '');       // leading/trailing dash remove

//     // ✅ Check if slug already exists
//     const existingProduct = await Product.findOne({ slug });
//     if (existingProduct) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product with this name already exists',
//       });
//     }

//     // ✅ Product create
//     const product = await Product.create({
//       name,
//       slug,
//       price: Number(price),
//       description: description || '',
//       image,                          // ✅ Yeh as-it-is jaata hai
//       category: category || null,
//       stock: Number(stock) || 0,
//     });

//     // ✅ DEBUG LOGS — Database mein save hone ke baad
//     console.log("🔍 CREATE — IMAGE AFTER SAVE:", product.image);
//     console.log("🔍 CREATE — DOTS AFTER SAVE:", (product.image?.match(/\./g) || []).length);

//     res.status(201).json({ success: true, product });
//   } catch (err) {
//     console.log('🔥 Error creating product:', err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// ✅ Create Product (with MRP + Discount)
export const createProduct = async (req, res) => {
  try {
    const { name, price, mrp, description, image, category, stock } = req.body;

    // ✅ DEBUG LOGS — Frontend se aaya hua data
    console.log("🔍 CREATE — IMAGE FROM FRONTEND:", image);
    console.log("🔍 CREATE — DOTS COUNT:", (image?.match(/\./g) || []).length);
    console.log("🔍 CREATE — PRICE:", price);
    console.log("🔍 CREATE — MRP:", mrp);
    console.log("🔍 CREATE — FULL BODY:", JSON.stringify(req.body, null, 2));

    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and image are required',
      });
    }

    // ✅ Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → dash
      .replace(/^-+|-+$/g, '');       // leading/trailing dash remove

    // ✅ Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this name already exists',
      });
    }

    // ✅ Discount calculate karo
    const sellingPrice = Number(price);
    const originalPrice = Number(mrp) || sellingPrice;
    let discountPercent = 0;

    if (originalPrice > sellingPrice) {
      discountPercent = Math.round(
        ((originalPrice - sellingPrice) / originalPrice) * 100
      );
    }

    console.log("🔍 CREATE — DISCOUNT %:", discountPercent);

    // ✅ Product create
    const product = await Product.create({
      name,
      slug,
      price: sellingPrice,            // ✅ Selling price
      mrp: originalPrice,             // ✅ MRP
      discountPercent,                // ✅ Discount %
      description: description || '',
      image,
      category: category || null,
      stock: Number(stock) || 0,
    });

    // ✅ DEBUG LOGS — Database mein save hone ke baad
    console.log("🔍 CREATE — IMAGE AFTER SAVE:", product.image);
    console.log("🔍 CREATE — DOTS AFTER SAVE:", (product.image?.match(/\./g) || []).length);
    console.log("🔍 CREATE — DISCOUNT AFTER SAVE:", product.discountPercent);

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.log('🔥 Error creating product:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     // ✅ Agar name change hua hai, toh slug bhi update karein
//     if (updateData.name) {
//       updateData.slug = updateData.name
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-+|-+$/g, '');
//     }

//     // ✅ Price/stock ko number mein convert karein
//     if (updateData.price) updateData.price = Number(updateData.price);
//     if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     res.json({ success: true, product });
//   } catch (err) {
//     console.log('🔥 Error updating product:', err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// ✅ Update Product (with MRP + Discount)
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    console.log("🔍 UPDATE — BODY:", JSON.stringify(updateData, null, 2));

    // ✅ Agar name change hua hai, toh slug bhi update karein
    if (updateData.name) {
      updateData.slug = updateData.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // ✅ Price/MRP/Stock ko number mein convert karein
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.mrp) updateData.mrp = Number(updateData.mrp);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

    // ✅ Discount calculate karo (agar MRP aur Price dono hain)
    if (updateData.mrp && updateData.price) {
      if (updateData.mrp > updateData.price) {
        updateData.discountPercent = Math.round(
          ((updateData.mrp - updateData.price) / updateData.mrp) * 100
        );
      } else {
        updateData.discountPercent = 0;
      }
      console.log("🔍 UPDATE — DISCOUNT:", updateData.discountPercent);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log("✅ Product Updated — Discount:", product.discountPercent);
    res.json({ success: true, product });
  } catch (err) {
    console.log('🔥 Error updating product:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Upload Image to Cloudinary (with CloudinaryStorage)
// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded',
//       });
//     }

//     // ✅ CloudinaryStorage ne file already upload kar di hai
//     // req.file.path = Cloudinary URL
//     // req.file.filename = public_id

//     res.json({
//       success: true,
//       imageUrl: req.file.path,        // ✅ Cloudinary URL
//       publicId: req.file.filename,    // ✅ public_id
//     });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };  

// controllers/adminController.js
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log("📁 File size:", req.file.size);
    console.log("📁 File mimetype:", req.file.mimetype);
    console.log("📁 File name:", req.file.originalname);

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'product_images',
      resource_type: 'image',
    });

    console.log("✅ Cloudinary URL:", result.secure_url);
    console.log("🔍 DOTS:", (result.secure_url.match(/\./g) || []).length);

    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single User by ID (with orders, addresses, wishlist)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('wishlist', 'name image price')
      .populate('addresses');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ✅ User ke saare orders fetch karein
    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // ✅ User statistics
    const totalOrders = await Order.countDocuments({ user: user._id });
    const totalSpent = await Order.aggregate([
      { $match: { user: user._id, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      success: true,
      user: user.toObject(),
      orders,
      stats: {
        totalOrders,
        totalSpent: totalSpent[0]?.total || 0,
        wishlistCount: user.wishlist?.length || 0,
        addressCount: user.addresses?.length || 0,
      },
    });
  } catch (err) {
    console.log('🔥 Error fetching user:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Get low stock products
export const getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;

    const products = await Product.find({ stock: { $lte: threshold } })
      .populate('category', 'name')
      .sort({ stock: 1 })
      .limit(50);

    res.json({
      success: true,
      count: products.length,
      threshold,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update product stock
export const updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({ success: false, message: 'Valid stock required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: Number(stock) },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // ✅ Low stock notification create karein
    if (product.stock <= 10 && product.stock > 0) {
      try {
        await createNotification({
          recipientRole: 'admin',
          title: '⚠️ Low Stock Alert',
          message: `${product.name} — only ${product.stock} left in stock`,
          type: 'warning',
          link: `/admin/products`,
          referenceId: product._id,
        });
      } catch (err) {
        console.log('Notification error:', err.message);
      }
    }

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Top Products
export const getTopProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    // ✅ Aggregate — orders se top products
    const topProducts = await Order.aggregate([
      // ✅ Sirf valid orders
      {
        $match: {
          status: { $nin: ['Cancelled', 'Returned'] },
        },
      },
      // ✅ orderItems ko unwind karein
      { $unwind: '$orderItems' },
      // ✅ Product wise group karein
      {
        $group: {
          _id: '$orderItems.productId',
          name: { $first: '$orderItems.name' },
          image: { $first: '$orderItems.image' },
          price: { $first: '$orderItems.price' },
          totalQty: { $sum: '$orderItems.qty' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] } },
          orderCount: { $sum: 1 },
        },
      },
      // ✅ Top products sort
      { $sort: { totalQty: -1 } },
      { $limit: limit },
    ]);

    res.json({
      success: true,
      topProducts,
    });
  } catch (err) {
    console.log('🔥 Top products error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Get User Growth (Last 6 Months)
export const getUserGrowth = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 6;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // ✅ Month names mapping
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // ✅ Last 6 months ka full data banao (missing months = 0)
    const result = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;

      const found = userGrowth.find(
        (item) => item._id.year === year && item._id.month === month
      );

      result.push({
        month: monthNames[month - 1],
        year: year,
        count: found ? found.count : 0,
      });
    }

    res.json({
      success: true,
      userGrowth: result,
    });
  } catch (err) {
    console.log('🔥 User growth error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

