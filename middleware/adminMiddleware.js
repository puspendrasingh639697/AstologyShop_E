// middleware/adminMiddleware.js

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