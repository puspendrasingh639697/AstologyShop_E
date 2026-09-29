
// // import Notification from '../models/Notification.js';

// // // ✅ CREATE NOTIFICATION - Database mein save karega
// // export const createNotification = async (userId, title, message, type, orderId) => {
// //     try {
// //         const notification = new Notification({
// //             user: userId,
// //             title: title,
// //             message: message,
// //             type: type || 'order',
// //             isRead: false,
// //             orderId: orderId || null
// //         });
        
// //         await notification.save();
// //         console.log(`✅ Notification saved for user ${userId}: ${title}`);
// //         return true;
// //     } catch (error) {
// //         console.error("Notification save error:", error.message);
// //         return false;
// //     }
// // };

// // // ✅ GET user notifications
// // export const getUserNotifications = async (req, res) => {
// //     try {
// //         const notifications = await Notification.find({ user: req.user._id })
// //             .sort({ createdAt: -1 });
// //         const unreadCount = notifications.filter(n => !n.isRead).length;
        
// //         res.json({ 
// //             success: true, 
// //             notifications,
// //             unreadCount 
// //         });
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // };

// // // ✅ Mark notification as read
// // export const markAsRead = async (req, res) => {
// //     try {
// //         const notification = await Notification.findOneAndUpdate(
// //             { _id: req.params.id, user: req.user._id },
// //             { isRead: true },
// //             { new: true }
// //         );
// //         if (!notification) {
// //             return res.status(404).json({ message: "Notification not found" });
// //         }
// //         res.json({ success: true, notification });
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // };

// // // ✅ Mark all as read
// // export const markAllAsRead = async (req, res) => {
// //     try {
// //         await Notification.updateMany(
// //             { user: req.user._id, isRead: false },
// //             { isRead: true }
// //         );
// //         res.json({ success: true, message: "All notifications marked as read" });
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // };

// // controllers/notificationController.js
// import Notification from '../models/Notification.js';

// // ✅ CREATE — Admin aur User dono ke liye
// export const createNotification = async ({
//   userId = null,
//   recipientRole = 'user',
//   title,
//   message,
//   type = 'info',
//   link = '',
//   orderId = null,
// }) => {
//   try {
//     const notification = await Notification.create({
//       user: userId,
//       recipientRole,
//       title,
//       message,
//       type,
//       link,
//       orderId,
//       isRead: false,
//     });

//     console.log(`✅ Notification: ${title} (${recipientRole})`);
//     return notification;
//   } catch (error) {
//     console.error('Notification create error:', error.message);
//     return null;
//   }
// };

// // ✅ GET — Admin Panel (role-based)
// export const getAdminNotifications = async (req, res) => {
//   try {
//     const userRole = req.user.role;
//     const userId = req.user._id;

//     // ✅ Admin ko: role-based + specific
//     const filter = {
//       $or: [
//         { recipientRole: userRole },
//         { recipientRole: 'all' },
//         { user: userId },
//       ],
//     };

//     const notifications = await Notification.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(50);

//     const unreadCount = notifications.filter((n) => !n.isRead).length;

//     res.json({
//       success: true,
//       notifications,
//       unreadCount,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ GET — User Panel (existing)
// export const getUserNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       user: req.user._id,
//     }).sort({ createdAt: -1 });

//     const unreadCount = notifications.filter((n) => !n.isRead).length;

//     res.json({
//       success: true,
//       notifications,
//       unreadCount,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Mark as read
// export const markAsRead = async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(
//       req.params.id,
//       { isRead: true, readAt: new Date() },
//       { new: true }
//     );

//     if (!notification) {
//       return res.status(404).json({ success: false, message: 'Not found' });
//     }

//     res.json({ success: true, notification });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Mark all as read
// export const markAllAsRead = async (req, res) => {
//   try {
//     const userRole = req.user.role;

//     await Notification.updateMany(
//       {
//         $or: [
//           { recipientRole: userRole },
//           { recipientRole: 'all' },
//           { user: req.user._id },
//         ],
//         isRead: false,
//       },
//       { isRead: true, readAt: new Date() }
//     );

//     res.json({ success: true, message: 'All marked as read' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete
// export const deleteNotification = async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// controllers/notificationController.js
import Notification from '../models/Notification.js';

// ✅ CREATE NOTIFICATION — Admin aur User dono ke liye
export const createNotification = async ({
  userId = null,
  recipientRole = 'user',
  title,
  message,
  type = 'info',
  link = '',
  orderId = null,
}) => {
  try {
    const notification = await Notification.create({
      user: userId,
      recipientRole,
      title,
      message,
      type,
      link,
      orderId,
      isRead: false,
    });

    console.log(`✅ Notification: ${title} (${recipientRole})`);
    return notification;
  } catch (error) {
    console.error('Notification create error:', error.message);
    return null;
  }
};

// ✅ GET — Admin Panel (role-based)
export const getAdminNotifications = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user._id;

    const filter = {
      $or: [
        { recipientRole: userRole },
        { recipientRole: 'all' },
        { user: userId },
      ],
    };

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET — User Panel
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET — Unread count only
export const getUnreadCount = async (req, res) => {
  try {
    const userRole = req.user.role;

    const count = await Notification.countDocuments({
      $or: [
        { recipientRole: userRole },
        { recipientRole: 'all' },
        { user: req.user._id },
      ],
      isRead: false,
    });

    res.json({ success: true, unreadCount: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Mark single as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    const userRole = req.user.role;

    await Notification.updateMany(
      {
        $or: [
          { recipientRole: userRole },
          { recipientRole: 'all' },
          { user: req.user._id },
        ],
        isRead: false,
      },
      { isRead: true, readAt: new Date() }
    );

    res.json({ success: true, message: 'All marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};