// // backend/middleware/roleMiddleware.js

// // Restrict access to specific roles
// export const restrictTo = (...roles) => {
//     return (req, res, next) => {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authenticated' });
//         }
        
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ 
//                 message: `Access denied. ${req.user.role || 'User'} cannot access this resource`,
//                 requiredRoles: roles
//             });
//         }
        
//         next();
//     };
// };

// // Check if user is at least minimum role level
// export const minRole = (minRole) => {
//     const roleLevel = {
//         'super_admin': 5,
//         'admin': 4,
//         'manager': 3,
//         'editor': 2,
//         'viewer': 1,
//         'user': 0
//     };
    
//     return (req, res, next) => {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authenticated' });
//         }
        
//         const userLevel = roleLevel[req.user.role] || 0;
//         const requiredLevel = roleLevel[minRole] || 0;
        
//         if (userLevel < requiredLevel) {
//             return res.status(403).json({ 
//                 message: `Access denied. Requires ${minRole} or higher role`,
//                 currentRole: req.user.role,
//                 requiredMinRole: minRole
//             });
//         }
        
//         next();
//     };
// };


// middleware/roleMiddleware.js

// ✅ Restrict access to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role || 'User'} cannot access this resource`,
        requiredRoles: roles,
      });
    }

    next();
  };
};

// ✅ Admin ya Super Admin dono ke liye
export const adminOnly = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === 'admin' || req.user.role === 'super_admin')
  ) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Admin access required',
  });
};

// ✅ Sirf Super Admin ke liye
export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Super Admin access required',
  });
};

// ✅ Blog Admin ya Super Admin ke liye
export const blogAdminOnly = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === 'blog_admin' || req.user.role === 'super_admin')
  ) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Blog Admin access required',
  });
};

// ✅ Minimum role level check
export const minRole = (minRole) => {
  const roleLevel = {
    super_admin: 5,
    admin: 4,
    blog_admin: 3,
    manager: 3,
    editor: 2,
    viewer: 1,
    astrologer: 1,
    user: 0,
  };

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const userLevel = roleLevel[req.user.role] || 0;
    const requiredLevel = roleLevel[minRole] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires ${minRole} or higher role`,
        currentRole: req.user.role,
        requiredMinRole: minRole,
      });
    }

    next();
  };
};