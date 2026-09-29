// // controllers/bannerController.js
// import Banner from '../models/Banner.js';

// // ✅ Get all banners (Admin)
// export const getAllBanners = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const position = req.query.position || '';
//     const isActive = req.query.isActive;

//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (position) filter.position = position;
//     if (isActive !== undefined) filter.isActive = isActive === 'true';

//     const totalBanners = await Banner.countDocuments(filter);

//     const banners = await Banner.find(filter)
//       .sort({ displayOrder: 1, createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       success: true,
//       banners,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalBanners / limit),
//         totalBanners,
//         limit,
//         hasNextPage: page < Math.ceil(totalBanners / limit),
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get active banners (Public — user project ke liye)
// export const getActiveBanners = async (req, res) => {
//   try {
//     const { position = 'hero' } = req.query;

//     const now = new Date();
//     const banners = await Banner.find({
//       position,
//       isActive: true,
//       $or: [
//         { startDate: null, endDate: null },
//         { startDate: { $lte: now }, endDate: null },
//         { startDate: null, endDate: { $gte: now } },
//         { startDate: { $lte: now }, endDate: { $gte: now } },
//       ],
//     }).sort({ displayOrder: 1 });

//     res.json({ success: true, banners });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get single banner
// export const getBannerById = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, message: 'Banner not found' });
//     }

//     res.json({ success: true, banner });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Create banner
// export const createBanner = async (req, res) => {
//   try {
//     const { title, image } = req.body;

//     if (!title || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Title and image are required',
//       });
//     }

//     const banner = await Banner.create(req.body);

//     res.status(201).json({ success: true, banner });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Update banner
// export const updateBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!banner) {
//       return res.status(404).json({ success: false, message: 'Banner not found' });
//     }

//     res.json({ success: true, banner });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Toggle active
// export const toggleBannerStatus = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, message: 'Banner not found' });
//     }

//     banner.isActive = !banner.isActive;
//     await banner.save();

//     res.json({
//       success: true,
//       message: banner.isActive ? 'Banner activated' : 'Banner deactivated',
//       banner,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete banner
// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findByIdAndDelete(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ success: false, message: 'Banner not found' });
//     }

//     res.json({ success: true, message: 'Banner deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/bannerController.js
import Banner from '../models/Banner.js';
import cloudinary from '../config/cloudinary.js';   // ✅ ADD karo

// ==========================================
// ✅ HELPER — Image URL handle karo
// ==========================================
const processBannerImage = async (imageData) => {
  if (!imageData) return '';

  // ✅ Agar URL hai (http/https), toh as-it-is return karo
  if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
    console.log('✅ Image is URL:', imageData);
    return imageData;
  }

  // ✅ Agar base64 hai, toh Cloudinary par upload karo
  if (imageData.startsWith('data:image')) {
    console.log('⚠️ Base64 detected — uploading to Cloudinary...');

    try {
      const result = await cloudinary.uploader.upload(imageData, {
        folder: 'banners',
        resource_type: 'image',
      });

      console.log('✅ Cloudinary URL:', result.secure_url);
      return result.secure_url;
    } catch (err) {
      console.error('❌ Cloudinary upload error:', err);
      throw new Error('Failed to upload banner image: ' + err.message);
    }
  }

  // ❌ Kuch aur hai — reject karo
  console.warn('❌ Invalid image format:', imageData.substring(0, 50));
  return '';
};

// ==========================================
// ✅ GET ALL BANNERS (Admin)
// ==========================================
export const getAllBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const position = req.query.position || '';
    const isActive = req.query.isActive;

    const skip = (page - 1) * limit;

    const filter = {};
    if (position) filter.position = position;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const totalBanners = await Banner.countDocuments(filter);

    const banners = await Banner.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: banners.length,
      banners,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBanners / limit),
        totalBanners,
        limit,
        hasNextPage: page < Math.ceil(totalBanners / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error('❌ Get all banners error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ GET ACTIVE BANNERS (Public — user project ke liye)
// ==========================================
export const getActiveBanners = async (req, res) => {
  try {
    const { position = 'hero' } = req.query;

    const now = new Date();
    const banners = await Banner.find({
      position,
      isActive: true,
      $or: [
        { startDate: null, endDate: null },
        { startDate: { $lte: now }, endDate: null },
        { startDate: null, endDate: { $gte: now } },
        { startDate: { $lte: now }, endDate: { $gte: now } },
      ],
    }).sort({ displayOrder: 1 });

    console.log(`✅ Active banners (${position}):`, banners.length);

    res.json({ success: true, count: banners.length, banners });
  } catch (err) {
    console.error('❌ Get active banners error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ GET SINGLE BANNER
// ==========================================
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ CREATE BANNER
// ==========================================
export const createBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      image,
      link,
      buttonText,
      position,
      displayOrder,
      isActive,
      startDate,
      endDate,
    } = req.body;

    console.log('🔍 Create banner — image type:', image?.substring(0, 30));

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title and image are required',
      });
    }

    // ✅ Image URL process karo (base64 → Cloudinary)
    const imageUrl = await processBannerImage(image);

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image — please provide a valid URL or base64',
      });
    }

    const banner = await Banner.create({
      title,
      subtitle: subtitle || '',
      image: imageUrl,   // ✅ URL save hoga
      link: link || '',
      buttonText: buttonText || 'Shop Now',
      position: position || 'hero',
      displayOrder: displayOrder || 0,
      isActive: isActive !== false,
      startDate: startDate || null,
      endDate: endDate || null,
    });

    console.log('✅ Banner created:', banner._id);

    res.status(201).json({ success: true, banner });
  } catch (err) {
    console.error('❌ Create banner error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ UPDATE BANNER
// ==========================================
export const updateBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    console.log('🔍 Update banner — image type:', updateData.image?.substring(0, 30));

    // ✅ Agar image diya hai, toh process karo
    if (updateData.image) {
      const imageUrl = await processBannerImage(updateData.image);

      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image — please provide a valid URL or base64',
        });
      }

      updateData.image = imageUrl;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    console.log('✅ Banner updated:', banner._id);

    res.json({ success: true, banner });
  } catch (err) {
    console.error('❌ Update banner error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ TOGGLE ACTIVE STATUS
// ==========================================
export const toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    console.log(`✅ Banner ${banner.isActive ? 'activated' : 'deactivated'}:`, banner._id);

    res.json({
      success: true,
      message: banner.isActive ? 'Banner activated' : 'Banner deactivated',
      banner,
    });
  } catch (err) {
    console.error('❌ Toggle banner error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ DELETE BANNER
// ==========================================
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    // ✅ Cloudinary se bhi delete karo (optional)
    if (banner.image && banner.image.includes('cloudinary')) {
      try {
        const publicId = banner.image
          .split('/')
          .slice(-2)
          .join('/')
          .replace(/\.[^/.]+$/, '');

        await cloudinary.uploader.destroy(publicId);
        console.log('✅ Cloudinary image deleted:', publicId);
      } catch (err) {
        console.warn('⚠️ Cloudinary delete error:', err.message);
      }
    }

    console.log('✅ Banner deleted:', req.params.id);

    res.json({ success: true, message: 'Banner deleted' });
  } catch (err) {
    console.error('❌ Delete banner error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};