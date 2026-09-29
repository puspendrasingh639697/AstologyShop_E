// // controllers/settingsController.js
// import Settings from '../models/Settings.js';

// // ✅ Get Settings (create if not exists)
// export const getSettings = async (req, res) => {
//   try {
//     let settings = await Settings.findOne();

//     if (!settings) {
//       settings = await Settings.create({});
//     }

//     res.json({ success: true, settings });
//   } catch (err) {
//     console.error('Get settings error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // export const updateSettings = async (req, res) => {
// //   try {
// //     let settings = await Settings.findOne();

// //     if (!settings) {
// //       settings = await Settings.create(req.body);
// //     } else {
// //       // ✅ Coupons ko sanitize karein — dates convert karein
// //       if (req.body.coupons && Array.isArray(req.body.coupons)) {
// //         req.body.coupons = req.body.coupons.map((coupon) => {
// //           let expiresAt = null;
// //           let createdAt = new Date();

// //           // ✅ expiresAt valid date hai ya nahi
// //           if (coupon.expiresAt) {
// //             const d = new Date(coupon.expiresAt);
// //             expiresAt = isNaN(d.getTime()) ? null : d;
// //           }

// //           // ✅ createdAt valid date hai ya nahi
// //           if (coupon.createdAt) {
// //             const d = new Date(coupon.createdAt);
// //             createdAt = isNaN(d.getTime()) ? new Date() : d;
// //           }

// //           return {
// //             ...coupon,
// //             expiresAt,
// //             createdAt,
// //           };
// //         });
// //       }

// //       // ✅ Internal fields delete karein
// //       delete req.body.updatedAt;
// //       delete req.body.createdAt;
// //       delete req.body._id;
// //       delete req.body.__v;

// //       Object.assign(settings, req.body);
// //       await settings.save();
// //     }

// //     res.json({ success: true, message: 'Settings updated', settings });
// //   } catch (err) {
// //     console.error('Update settings error:', err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };


// // controllers/settingsController.js
// export const updateSettings = async (req, res) => {
//   try {
//     // ✅ Destructuring se internal fields alag karo
//     const {
//       _id, __v, createdAt, updatedAt,   // ❌ Yeh ignore karo
//       ...updateData                     // ✅ Yeh use karo
//     } = req.body;

//     let settings = await Settings.findOne();

//     if (!settings) {
//       settings = await Settings.create(updateData);
//     } else {
//       // ✅ Coupons sanitize (pehle jaisa)
//       if (updateData.coupons && Array.isArray(updateData.coupons)) {
//         updateData.coupons = updateData.coupons.map((coupon) => {
//           let expiresAt = null;
//           let createdAt = new Date();

//           if (coupon.expiresAt) {
//             const d = new Date(coupon.expiresAt);
//             expiresAt = isNaN(d.getTime()) ? null : d;
//           }

//           if (coupon.createdAt) {
//             const d = new Date(coupon.createdAt);
//             createdAt = isNaN(d.getTime()) ? new Date() : d;
//           }

//           return { ...coupon, expiresAt, createdAt };
//         });
//       }

//       // ✅ Ab Object.assign karo clean data ke saath
//       Object.assign(settings, updateData);
//       await settings.save();
//     }

//     res.json({ success: true, message: 'Settings updated', settings });
//   } catch (err) {
//     console.error('Update settings error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// export const addCoupon = async (req, res) => {
//   try {
//     const { code, discountType, discountValue, minOrderAmount, expiresAt } = req.body;

//     if (!code || !discountValue) {
//       return res.status(400).json({ success: false, message: 'Code and discount value required' });
//     }

//     let settings = await Settings.findOne();
//     if (!settings) settings = await Settings.create({});

//     // ✅ Duplicate check
//     const existing = settings.coupons.find((c) => c.code === code.toUpperCase());
//     if (existing) {
//       return res.status(400).json({ success: false, message: 'Coupon code already exists' });
//     }

//     // ✅ expiresAt valid date hai ya nahi
//     let validExpiresAt = null;
//     if (expiresAt && expiresAt !== '') {
//       const d = new Date(expiresAt);
//       validExpiresAt = isNaN(d.getTime()) ? null : d;
//     }

//     settings.coupons.push({
//       code: code.toUpperCase(),
//       discountType: discountType || 'percentage',
//       discountValue: Number(discountValue),
//       minOrderAmount: Number(minOrderAmount) || 0,
//       expiresAt: validExpiresAt,
//       createdAt: new Date(),
//     });

//     await settings.save();

//     res.json({ success: true, message: 'Coupon added', coupons: settings.coupons });
//   } catch (err) {
//     console.error('Add coupon error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete Coupon
// export const deleteCoupon = async (req, res) => {
//   try {
//     const { code } = req.params;

//     const settings = await Settings.findOne();
//     if (!settings) {
//       return res.status(404).json({ success: false, message: 'Settings not found' });
//     }

//     settings.coupons = settings.coupons.filter((c) => c.code !== code.toUpperCase());
//     await settings.save();

//     res.json({ success: true, message: 'Coupon deleted', coupons: settings.coupons });
//   } catch (err) {
//     console.error('Delete coupon error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// controllers/settingsController.js
import Settings from '../models/Settings.js';

// ✅ Helper: Coupons ko sanitize karo
const sanitizeCoupons = (coupons) => {
  if (!coupons || !Array.isArray(coupons)) return [];

  return coupons.map((coupon) => {
    let expiresAt = null;
    let createdAt = new Date();

    // ✅ expiresAt valid date hai ya nahi
    if (coupon.expiresAt) {
      const d = new Date(coupon.expiresAt);
      expiresAt = isNaN(d.getTime()) ? null : d;
    }

    // ✅ createdAt valid date hai ya nahi
    if (coupon.createdAt) {
      const d = new Date(coupon.createdAt);
      createdAt = isNaN(d.getTime()) ? new Date() : d;
    }

    // ✅ Coupon ke andar se _id hata do (naya banega automatically)
    const { _id, ...couponData } = coupon;

    return {
      ...couponData,
      expiresAt,
      createdAt,
    };
  });
};

// ✅ GET Settings (create if not exists)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({ success: true, settings });
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE Settings
export const updateSettings = async (req, res) => {
  try {
    // ✅ Internal fields alag karo
    const {
      _id, __v, createdAt, updatedAt,   // ❌ Yeh ignore karo
      coupons,                           // ✅ Alag se handle karenge
      ...updateData                      // ✅ Baaki fields
    } = req.body;

    let settings = await Settings.findOne();

    // ✅ Agar settings nahi hai, toh naya banao
    if (!settings) {
      const createData = { ...updateData };
      if (coupons && Array.isArray(coupons)) {
        createData.coupons = sanitizeCoupons(coupons);
      }

      settings = await Settings.create(createData);

      return res.json({
        success: true,
        message: 'Settings created',
        settings,
      });
    }

    // ✅ Coupons ko sanitize karke assign karo
    if (coupons && Array.isArray(coupons)) {
      updateData.coupons = sanitizeCoupons(coupons);
    }

    // ✅ Sirf woh fields update karo jo bheje gaye hain
    Object.keys(updateData).forEach((key) => {
      // ✅ Empty string aur undefined ko skip karo (agar chaho)
      // Agar empty string bhi save karni hai, toh yeh condition hatao
      if (updateData[key] !== undefined) {
        settings[key] = updateData[key];
      }
    });

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated',
      settings,
    });
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADD Coupon
export const addCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiresAt } = req.body;

    if (!code || !discountValue) {
      return res.status(400).json({
        success: false,
        message: 'Code and discount value required',
      });
    }

    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});

    // ✅ Duplicate check
    const existing = settings.coupons.find(
      (c) => c.code === code.toUpperCase()
    );
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists',
      });
    }

    // ✅ expiresAt valid date hai ya nahi
    let validExpiresAt = null;
    if (expiresAt && expiresAt !== '') {
      const d = new Date(expiresAt);
      validExpiresAt = isNaN(d.getTime()) ? null : d;
    }

    settings.coupons.push({
      code: code.toUpperCase(),
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      expiresAt: validExpiresAt,
      createdAt: new Date(),
    });

    await settings.save();

    res.json({
      success: true,
      message: 'Coupon added',
      coupons: settings.coupons,
    });
  } catch (err) {
    console.error('Add coupon error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE Coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { code } = req.params;

    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Settings not found',
      });
    }

    settings.coupons = settings.coupons.filter(
      (c) => c.code !== code.toUpperCase()
    );
    await settings.save();

    res.json({
      success: true,
      message: 'Coupon deleted',
      coupons: settings.coupons,
    });
  } catch (err) {
    console.error('Delete coupon error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};