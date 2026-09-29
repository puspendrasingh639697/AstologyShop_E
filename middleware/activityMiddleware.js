// middleware/activityMiddleware.js
import { logActivity } from '../controllers/activityController.js';

// ✅ Auto-log middleware
export const autoLog = (action, targetModel = 'Other', getDescription = null) => {
  return async (req, res, next) => {
    // ✅ Original res.json ko override karein
    const originalJson = res.json.bind(res);

    res.json = async function (data) {
      // ✅ Sirf successful requests log karein
      if (res.statusCode < 400 && req.user) {
        try {
          const description = getDescription
            ? getDescription(req, data)
            : `${action} ${targetModel}`;

          await logActivity({
            user: req.user,
            action,
            targetModel,
            targetId: req.params.id || data?._id || data?.product?._id || null,
            targetName: data?.product?.name || data?.name || data?.user?.name || '',
            description,
            status: 'success',
            req,
          });
        } catch (err) {
          console.error('Auto-log error:', err.message);
        }
      }

      return originalJson(data);
    };

    next();
  };
};