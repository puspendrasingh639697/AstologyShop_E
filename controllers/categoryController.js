// import Category from '../models/Category.js';

// // ✅ Create Category (Admin Only)
// export const createCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         // Validation agar name na mile
//         if (!name) {
//             return res.status(400).json({ success: false, message: "Category name is required!" });
//         }

//         const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

//         const existingCategory = await Category.findOne({ slug });
//         if (existingCategory) {
//             return res.status(400).json({ success: false, message: "Category already exists!" });
//         }

//         // 👈 Yahan humne req.file.path use kiya hai jo ki Cloudinary ka direct URL deta hai
//         const imagePath = req.file ? req.file.path : "";

//         const category = await Category.create({
//             name,
//             slug,
//             description,
//             image: imagePath // Ab yahan Cloudinary ka poora URL save hoga
//         });

//         res.status(201).json({
//             success: true,
//             message: "Category created successfully!",
//             category
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ✅ Get All Categories (Public)
// export const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find({ isActive: true }).lean();
//         res.status(200).json({
//             success: true,
//             count: categories.length,
//             categories
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// controllers/categoryController.js
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// ✅ Helper — Generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ==========================================
// ✅ EXISTING FUNCTIONS (Same rahenge)
// ==========================================

// // ✅ Create Category (Admin)
// export const createCategory = async (req, res) => {
//   try {
//     const { name, description, image: imageUrl, isActive } = req.body;

//     if (!name) {
//       return res.status(400).json({ success: false, message: 'Category name is required!' });
//     }

//     const slug = generateSlug(name);

//     const existingCategory = await Category.findOne({
//       $or: [{ slug }, { name: name.trim() }],
//     });

//     if (existingCategory) {
//       return res.status(400).json({ success: false, message: 'Category already exists!' });
//     }

//     // ✅ Image: File upload (Cloudinary) ya URL
//     const imagePath = req.file ? req.file.path : (imageUrl || '');

//     const category = await Category.create({
//       name: name.trim(),
//       slug,
//       description: description || '',
//       image: imagePath,
//       isActive: isActive !== false && isActive !== 'false',
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Category created successfully!',
//       category,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const createCategory = async (req, res) => {
//   try {
//     let { name, description, image: imageUrl, isActive } = req.body;

//     // ✅ URL REPAIR — agar dots missing hain toh add karo
//     if (imageUrl && !imageUrl.includes('res.cloudinary.com')) {
//       imageUrl = imageUrl
//         .replace('rescloudinarycom', 'res.cloudinary.com')
//         .replace(/(\w)(jpg|jpeg|png|webp|gif)$/i, '$1.$2');
      
//       console.log("🔍 REPAIRED CATEGORY URL:", imageUrl);
//     }

//     if (!name) {
//       return res.status(400).json({ success: false, message: 'Category name is required!' });
//     }

//     const slug = generateSlug(name);

//     const existingCategory = await Category.findOne({
//       $or: [{ slug }, { name: name.trim() }],
//     });

//     if (existingCategory) {
//       return res.status(400).json({ success: false, message: 'Category already exists!' });
//     }

//     const imagePath = req.file ? req.file.path : (imageUrl || '');

//     const category = await Category.create({
//       name: name.trim(),
//       slug,
//       description: description || '',
//       image: imagePath,
//       isActive: isActive !== false && isActive !== 'false',
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Category created successfully!',
//       category,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// controllers/categoryController.js
export const createCategory = async (req, res) => {
  try {
    let { name, description, image: imageUrl, isActive } = req.body;

    console.log("🔍 CREATE CATEGORY — BODY:", JSON.stringify(req.body, null, 2));
    console.log("🔍 CREATE CATEGORY — IMAGE:", imageUrl);
    console.log("🔍 CREATE CATEGORY — FILE:", req.file);

    // ✅ URL REPAIR — agar dots missing hain toh add karo
    if (imageUrl && !imageUrl.includes('res.cloudinary.com')) {
      imageUrl = imageUrl
        .replace('rescloudinarycom', 'res.cloudinary.com')
        .replace(/(\w)(jpg|jpeg|png|webp|gif)$/i, '$1.$2');
      
      console.log("🔍 REPAIRED CATEGORY URL:", imageUrl);
    }

    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required!' });
    }

    const slug = generateSlug(name);

    const existingCategory = await Category.findOne({
      $or: [{ slug }, { name: name.trim() }],
    });

    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category already exists!' });
    }

    // ✅ Image: File ya URL
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path || req.file.secure_url || '';
      console.log("🔍 IMAGE FROM FILE:", imagePath);
    } else if (imageUrl) {
      imagePath = imageUrl;
      console.log("🔍 IMAGE FROM URL:", imagePath);
    } else {
      console.log("❌ NO IMAGE PROVIDED");
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description || '',
      image: imagePath,
      isActive: isActive !== false && isActive !== 'false',
    });

    console.log("✅ CATEGORY CREATED — IMAGE:", category.image);

    res.status(201).json({
      success: true,
      message: 'Category created successfully!',
      category,
    });
  } catch (error) {
    console.error("❌ CREATE CATEGORY ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Categories (Public — Only Active)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ✅ NEW FUNCTIONS — Admin Panel ke liye
// ==========================================

// ✅ Get All Categories (Admin — with Inactive + Product Count)
export const getAllCategoriesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const isActive = req.query.isActive;

    const skip = (page - 1) * limit;

    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (isActive !== undefined && isActive !== '') {
      filter.isActive = isActive === 'true';
    }

    const totalCategories = await Category.countDocuments(filter);

    const categories = await Category.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // ✅ Product count add karein
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({ category: cat._id });
        return { ...cat, productCount };
      })
    );

    res.json({
      success: true,
      categories: categoriesWithCount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCategories / limit),
        totalCategories,
        limit,
        hasNextPage: page < Math.ceil(totalCategories / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image: imageUrl, isActive } = req.body;

    const updateData = {
      description,
      isActive: isActive !== undefined ? (isActive !== false && isActive !== 'false') : undefined,
    };

    // ✅ Image: File upload ya URL
    if (req.file) {
      updateData.image = req.file.path;
    } else if (imageUrl !== undefined) {
      updateData.image = imageUrl;
    }

    // ✅ Agar name change hua, toh slug update karein
    if (name) {
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }

    // ✅ undefined fields hata dein
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Toggle Category Status
export const toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.json({
      success: true,
      message: category.isActive ? 'Category activated' : 'Category deactivated',
      category,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    // ✅ Check if products exist
    const productCount = await Product.countDocuments({ category: req.params.id });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete. ${productCount} products exist in this category.`,
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};