// // controllers/activityController.js
// import Activity from '../models/Activity.js';

// // ✅ Helper — Create activity log
// export const logActivity = async ({
//   user,
//   action,
//   targetModel = 'Other',
//   targetId = null,
//   targetName = '',
//   description = '',
//   details = {},
//   status = 'success',
//   req = null,
// }) => {
//   try {
//     const activity = await Activity.create({
//       user: user?._id || user,
//       userName: user?.name || 'Unknown',
//       userRole: user?.role || 'unknown',
//       action,
//       targetModel,
//       targetId,
//       targetName,
//       description,
//       details,
//       status,
//       ipAddress: req?.ip || req?.headers?.['x-forwarded-for'] || '',
//       userAgent: req?.headers?.['user-agent'] || '',
//     });

//     return activity;
//   } catch (err) {
//     console.error('Activity log error:', err.message);
//     return null;
//   }
// };

// // ✅ Get all activities (Admin)
// export const getAllActivities = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 30;
//     const action = req.query.action || '';
//     const targetModel = req.query.targetModel || '';
//     const search = req.query.search || '';
//     const startDate = req.query.startDate || '';
//     const endDate = req.query.endDate || '';

//     const skip = (page - 1) * limit;

//     const filter = {};

//     if (action) filter.action = action;
//     if (targetModel) filter.targetModel = targetModel;

//     if (search) {
//       filter.$or = [
//         { userName: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { targetName: { $regex: search, $options: 'i' } },
//       ];
//     }

//     // ✅ Date range
//     if (startDate || endDate) {
//       filter.createdAt = {};
//       if (startDate) filter.createdAt.$gte = new Date(startDate);
//       if (endDate) filter.createdAt.$lte = new Date(endDate);
//     }

//     const totalActivities = await Activity.countDocuments(filter);

//     const activities = await Activity.find(filter)
//       .populate('user', 'name email role')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       activities,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalActivities / limit),
//         totalActivities,
//         limit,
//         hasNextPage: page < Math.ceil(totalActivities / limit),
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get activity stats
// export const getActivityStats = async (req, res) => {
//   try {
//     const totalActivities = await Activity.countDocuments();

//     // ✅ Last 24 hours
//     const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     const recentActivities = await Activity.countDocuments({
//       createdAt: { $gte: last24Hours },
//     });

//     // ✅ By action
//     const byAction = await Activity.aggregate([
//       { $group: { _id: '$action', count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     // ✅ By user
//     const byUser = await Activity.aggregate([
//       { $group: { _id: { id: '$user', name: '$userName', role: '$userRole' }, count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 5 },
//     ]);

//     // ✅ By target model
//     const byTargetModel = await Activity.aggregate([
//       { $group: { _id: '$targetModel', count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalActivities,
//         recentActivities,
//         byAction,
//         byUser,
//         byTargetModel,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete old activities (Admin — cleanup)
// export const deleteOldActivities = async (req, res) => {
//   try {
//     const days = parseInt(req.query.days) || 30;
//     const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

//     const result = await Activity.deleteMany({
//       createdAt: { $lt: cutoffDate },
//     });

//     res.json({
//       success: true,
//       message: `Deleted ${result.deletedCount} activities older than ${days} days`,
//       deletedCount: result.deletedCount,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete single activity
// export const deleteActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findByIdAndDelete(req.params.id);
//     if (!activity) {
//       return res.status(404).json({ success: false, message: 'Activity not found' });
//     }
//     res.json({ success: true, message: 'Activity deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Clear all activities (Super Admin)
// export const clearAllActivities = async (req, res) => {
//   try {
//     await Activity.deleteMany({});
//     res.json({ success: true, message: 'All activities cleared' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/activityController.js
import Activity from '../models/Activity.js';

// ✅ Helper — Create activity log
export const logActivity = async ({
  user,
  userName: providedName,
  userRole: providedRole,
  action,
  targetModel = 'Other',
  targetId = null,
  targetName = '',
  description = '',
  details = {},
  status = 'success',
  req = null,
}) => {
  try {
    // ✅ User ID safely nikaalo
    let userId = null;
    let userName = providedName || 'Unknown';
    let userRole = providedRole || 'unknown';

    if (user) {
      if (typeof user === 'object' && user !== null) {
        userId = user._id || user.id || null;
        userName = user.name || user.email || userName;
        userRole = user.role || userRole;
      } else {
        userId = user;
      }
    }

    // ✅ Agar userId null hai toh skip karo (error avoid)
    if (!userId) {
      console.log('⚠️ Skipping activity log — no valid user ID');
      return null;
    }

    const activity = await Activity.create({
      user: userId,
      userName,
      userRole,
      action,
      targetModel,
      targetId,
      targetName,
      description,
      details,
      status,
      ipAddress: req?.ip || req?.headers?.['x-forwarded-for'] || '',
      userAgent: req?.headers?.['user-agent'] || '',
    });

    return activity;
  } catch (err) {
    console.error('Activity log error:', err.message);
    return null;
  }
};

// ✅ Get all activities (Admin)
export const getAllActivities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const action = req.query.action || '';
    const targetModel = req.query.targetModel || '';
    const search = req.query.search || '';
    const startDate = req.query.startDate || '';
    const endDate = req.query.endDate || '';

    const skip = (page - 1) * limit;

    const filter = {};

    if (action) filter.action = action;
    if (targetModel) filter.targetModel = targetModel;

    if (search) {
      filter.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { targetName: { $regex: search, $options: 'i' } },
      ];
    }

    // ✅ Date range
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const totalActivities = await Activity.countDocuments(filter);

    const activities = await Activity.find(filter)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      activities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalActivities / limit),
        totalActivities,
        limit,
        hasNextPage: page < Math.ceil(totalActivities / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get activity stats
export const getActivityStats = async (req, res) => {
  try {
    const totalActivities = await Activity.countDocuments();

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentActivities = await Activity.countDocuments({
      createdAt: { $gte: last24Hours },
    });

    const byAction = await Activity.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const byUser = await Activity.aggregate([
      {
        $group: {
          _id: { id: '$user', name: '$userName', role: '$userRole' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const byTargetModel = await Activity.aggregate([
      { $group: { _id: '$targetModel', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalActivities,
        recentActivities,
        byAction,
        byUser,
        byTargetModel,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete old activities (Admin — cleanup)
export const deleteOldActivities = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await Activity.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} activities older than ${days} days`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete single activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Clear all activities (Super Admin)
export const clearAllActivities = async (req, res) => {
  try {
    await Activity.deleteMany({});
    res.json({ success: true, message: 'All activities cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};