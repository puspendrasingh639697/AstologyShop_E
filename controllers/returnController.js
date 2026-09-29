// controllers/returnController.js
import Return from '../models/Return.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { createNotification } from './notificationController.js';

// ✅ Create Return Request (User)
export const createReturnRequest = async (req, res) => {
  try {
    const { orderId, items, reason, description, images, refundAmount, returnType } = req.body;
    const userId = req.user._id;

    if (!orderId || !items || items.length === 0 || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Order, items, and reason are required',
      });
    }

    // ✅ Check order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // ✅ Check order belongs to user
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // ✅ Check order delivered (only delivered orders can be returned)
    if (order.status !== 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Only delivered orders can be returned',
      });
    }

    // ✅ Check duplicate return
    const existingReturn = await Return.findOne({
      order: orderId,
      status: { $in: ['pending', 'approved', 'processing'] },
    });

    if (existingReturn) {
      return res.status(400).json({
        success: false,
        message: 'A return request already exists for this order',
      });
    }

    const returnRequest = await Return.create({
      order: orderId,
      user: userId,
      items,
      reason,
      description: description || '',
      images: images || [],
      refundAmount: Number(refundAmount) || order.totalPrice,
      returnType: returnType || 'Refund',
      status: 'pending',
    });

    // ✅ Admin ko notification
    await createNotification({
      recipientRole: 'admin',
      title: '🔄 New Return Request',
      message: `Return request for order #${order._id.toString().slice(-8)}`,
      type: 'warning',
      link: `/admin/returns/${returnRequest._id}`,
    });

    await createNotification({
      recipientRole: 'super_admin',
      title: '🔄 New Return Request',
      message: `Return request for order #${order._id.toString().slice(-8)}`,
      type: 'warning',
      link: `/admin/returns/${returnRequest._id}`,
    });

    res.status(201).json({
      success: true,
      message: 'Return request submitted successfully',
      returnRequest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get User's Returns
export const getMyReturns = async (req, res) => {
  try {
    const returns = await Return.find({ user: req.user._id })
      .populate('order', 'totalPrice status createdAt')
      .sort({ createdAt: -1 });

    res.json({ success: true, returns });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// // ✅ Get All Returns (Admin)
// export const getAllReturns = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const status = req.query.status || '';
//     const search = req.query.search || '';

//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (status) filter.status = status;
//     if (search) {
//       filter.reason = { $regex: search, $options: 'i' };
//     }

//     const totalReturns = await Return.countDocuments(filter);

//     const returns = await Return.find(filter)
//       .populate('user', 'name email phone')
//       .populate('order', 'totalPrice status createdAt')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       returns,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalReturns / limit),
//         totalReturns,
//         limit,
//         hasNextPage: page < Math.ceil(totalReturns / limit),
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// ✅ Get All Returns (Admin)
export const getAllReturns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.reason = { $regex: search, $options: 'i' };
    }

    const totalReturns = await Return.countDocuments(filter);

    const returns = await Return.find(filter)
      .populate('user', 'name email phone')
      .populate('order', 'totalPrice status createdAt')
      .populate('items.productId', 'name image price')   // ✅ ADD kiya
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ Fix corrupted image URLs
    const fixedReturns = returns.map((ret) => {
      const retObj = ret.toObject();
      retObj.items = retObj.items.map((item) => ({
        ...item,
        // ✅ productId.image priority dein
        image: item.productId?.image || item.image || '',
      }));
      return retObj;
    });

    res.json({
      success: true,
      returns: fixedReturns,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalReturns / limit),
        totalReturns,
        limit,
        hasNextPage: page < Math.ceil(totalReturns / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Return
export const getReturnById = async (req, res) => {
  try {
    const returnRequest = await Return.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('order')
      .populate('items.productId', 'name image price');

    if (!returnRequest) {
      return res.status(404).json({ success: false, message: 'Return not found' });
    }

    res.json({ success: true, returnRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Approve Return (Admin)
export const approveReturn = async (req, res) => {
  try {
    const { adminNote } = req.body;

    const returnRequest = await Return.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ success: false, message: 'Return not found' });
    }

    if (returnRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Return is already ${returnRequest.status}`,
      });
    }

    // ✅ Update return status
    returnRequest.status = 'approved';
    returnRequest.adminNote = adminNote || '';
    returnRequest.processedAt = new Date();
    returnRequest.processedBy = req.user._id;
    await returnRequest.save();

    // ✅ Stock wapas karein
    for (const item of returnRequest.items) {
      if (item.productId) {
        try {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.qty;
            await product.save();
          }
        } catch (err) {
          console.log('Stock update error:', err.message);
        }
      }
    }

    // ✅ Order status update
    await Order.findByIdAndUpdate(returnRequest.order, {
      status: 'Returned',
      isReturned: true,
      returnedAt: new Date(),
    });

    // ✅ User ko notification
    await createNotification({
      userId: returnRequest.user,
      recipientRole: 'user',
      title: '✅ Return Approved',
      message: `Your return for order #${returnRequest.order.toString().slice(-8)} is approved. Refund will be processed soon.`,
      type: 'success',
      link: `/account/returns`,
    });

    res.json({
      success: true,
      message: 'Return approved successfully',
      returnRequest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Reject Return (Admin)
export const rejectReturn = async (req, res) => {
  try {
    const { adminNote } = req.body;

    const returnRequest = await Return.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ success: false, message: 'Return not found' });
    }

    if (returnRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Return is already ${returnRequest.status}`,
      });
    }

    returnRequest.status = 'rejected';
    returnRequest.adminNote = adminNote || 'Return request rejected';
    returnRequest.processedAt = new Date();
    returnRequest.processedBy = req.user._id;
    await returnRequest.save();

    // ✅ User ko notification
    await createNotification({
      userId: returnRequest.user,
      recipientRole: 'user',
      title: '❌ Return Rejected',
      message: `Your return for order #${returnRequest.order.toString().slice(-8)} has been rejected.`,
      type: 'error',
      link: `/account/returns`,
    });

    res.json({
      success: true,
      message: 'Return rejected',
      returnRequest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Process Refund (Admin)
export const processRefund = async (req, res) => {
  try {
    const { refundMethod, refundTransactionId } = req.body;

    const returnRequest = await Return.findById(req.params.id);
    if (!returnRequest) {
      return res.status(404).json({ success: false, message: 'Return not found' });
    }

    if (returnRequest.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Return must be approved first',
      });
    }

    // ✅ Update refund status
    returnRequest.refundStatus = 'completed';
    returnRequest.refundMethod = refundMethod || 'Original Payment Method';
    returnRequest.refundTransactionId = refundTransactionId || '';
    returnRequest.refundedAt = new Date();
    returnRequest.status = 'completed';
    await returnRequest.save();

    // ✅ User ko notification
    await createNotification({
      userId: returnRequest.user,
      recipientRole: 'user',
      title: '💰 Refund Processed',
      message: `₹${returnRequest.refundAmount} refund has been processed for order #${returnRequest.order.toString().slice(-8)}.`,
      type: 'success',
      link: `/account/returns`,
    });

    res.json({
      success: true,
      message: 'Refund processed successfully',
      returnRequest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Return Stats (Admin Dashboard)
export const getReturnStats = async (req, res) => {
  try {
    const totalReturns = await Return.countDocuments();
    const pendingReturns = await Return.countDocuments({ status: 'pending' });
    const approvedReturns = await Return.countDocuments({ status: 'approved' });
    const completedReturns = await Return.countDocuments({ status: 'completed' });
    const rejectedReturns = await Return.countDocuments({ status: 'rejected' });

    const totalRefunded = await Return.aggregate([
      { $match: { status: 'completed', refundStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$refundAmount' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalReturns,
        pendingReturns,
        approvedReturns,
        completedReturns,
        rejectedReturns,
        totalRefunded: totalRefunded[0]?.total || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};