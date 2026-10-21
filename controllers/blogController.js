// import Blog from '../models/Blog.js';

// // ✅ Helper — Generate slug
// const generateSlug = (title) => {
//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// };

// // ✅ Create Blog (Admin)
// export const createBlog = async (req, res) => {
//   try {
//     let { title, content, excerpt, image: imageUrl, author, tags, metaTitle, metaDescription, focusKeyword, isPublished } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ success: false, message: 'Title and Content are required!' });
//     }

//     const slug = generateSlug(title);

//     // Check if slug already exists
//     const existingBlog = await Blog.findOne({ slug });
//     if (existingBlog) {
//       return res.status(400).json({ success: false, message: 'Blog with this title already exists!' });
//     }

//     // Image (File ya URL)
//     let imagePath = '';
//     if (req.file) {
//       imagePath = req.file.path || req.file.secure_url || '';
//     } else if (imageUrl) {
//       imagePath = imageUrl;
//     }

//     // Tags parsing (Agar string format mein aaye toh array mein convert karein)
//     let parsedTags = [];
//     if (tags) {
//       parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
//     }

//     const blog = await Blog.create({
//       title,
//       slug,
//       content,
//       excerpt: excerpt || content.substring(0, 150) + '...', // Auto excerpt if not provided
//       image: imagePath,
//       author: author || 'Admin',
//       tags: parsedTags,
//       metaTitle: metaTitle || title,
//       metaDescription: metaDescription || excerpt || content.substring(0, 160),
//       focusKeyword: focusKeyword || '',
//       isPublished: isPublished === 'true' || isPublished === true,
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Blog created successfully!',
//       blog,
//     });
//   } catch (error) {
//     console.error("❌ CREATE BLOG ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get All Blogs (Public — Only Published)
// export const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find({ isPublished: true })
//       .select('-content') // Content chhota karne ke liye (List page ke liye zaroori nahi)
//       .sort({ createdAt: -1 })
//       .lean();

//     res.status(200).json({
//       success: true,
//       count: blogs.length,
//       blogs,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get Single Blog by Slug (Public)
// export const getBlogBySlug = async (req, res) => {
//   try {
//     const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    
//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }
    
//     res.json({ success: true, blog });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==========================================
// // ✅ Admin Functions
// // ==========================================

// // ✅ Get All Blogs (Admin — with Drafts + Pagination)
// export const getAllBlogsAdmin = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = req.query.search || '';
//     const isPublished = req.query.isPublished;

//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (search) filter.title = { $regex: search, $options: 'i' };
//     if (isPublished !== undefined && isPublished !== '') {
//       filter.isPublished = isPublished === 'true';
//     }

//     const totalBlogs = await Blog.countDocuments(filter);

//     const blogs = await Blog.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     res.json({
//       success: true,
//       blogs,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalBlogs / limit),
//         totalBlogs,
//         limit,
//         hasNextPage: page < Math.ceil(totalBlogs / limit),
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get Single Blog by ID (Admin)
// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }
//     res.json({ success: true, blog });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Update Blog
// export const updateBlog = async (req, res) => {
//   try {
//     const { title, content, excerpt, image: imageUrl, author, tags, metaTitle, metaDescription, focusKeyword, isPublished } = req.body;

//     const updateData = {
//       content,
//       excerpt,
//       author,
//       metaTitle,
//       metaDescription,
//       focusKeyword,
//       isPublished: isPublished !== undefined ? (isPublished !== false && isPublished !== 'false') : undefined,
//     };

//     // Image: File upload ya URL
//     if (req.file) {
//       updateData.image = req.file.path;
//     } else if (imageUrl !== undefined) {
//       updateData.image = imageUrl;
//     }

//     // Update Title & Slug if title changes
//     if (title) {
//       updateData.title = title.trim();
//       updateData.slug = generateSlug(title);
//     }

//     // Tags parsing
//     if (tags) {
//       updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
//     }

//     // Remove undefined fields
//     Object.keys(updateData).forEach(
//       (key) => updateData[key] === undefined && delete updateData[key]
//     );

//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.json({ success: true, message: 'Blog updated successfully', blog });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Toggle Publish Status
// export const toggleBlogStatus = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     blog.isPublished = !blog.isPublished;
//     await blog.save();

//     res.json({
//       success: true,
//       message: blog.isPublished ? 'Blog published' : 'Blog moved to draft',
//       blog,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Delete Blog
// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);

//     if (!blog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.json({ success: true, message: 'Blog deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


import Blog from '../models/Blog.js';

// ✅ Helper — Generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ✅ Create Blog (Admin)
export const createBlog = async (req, res) => {
  try {
    let { title, content, excerpt, image: imageUrl, author, tags, metaTitle, metaDescription, focusKeyword, isPublished } = req.body;

    // 1. Validation
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and Content are required!' });
    }

    const slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ success: false, message: 'Blog with this title already exists!' });
    }

    // 2. Image Handling (File ya URL)
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path || req.file.secure_url || ''; // Cloudinary URL
      console.log("✅ Image uploaded via File:", imagePath);
    } else if (imageUrl) {
      imagePath = imageUrl;
      console.log("✅ Image provided via URL:", imagePath);
    }

    // ✅ Agar image nahi mili toh error dein
    if (!imagePath) {
      return res.status(400).json({ success: false, message: 'Image is required! Please upload a file or provide a URL.' });
    }

    // 3. Tags parsing
    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    }

    // ✅ 4. Auto Excerpt (HTML tags hata kar clean text banana)
    const cleanContent = content.replace(/<[^>]+>/g, '');
    const autoExcerpt = excerpt || (cleanContent.length > 150 ? cleanContent.substring(0, 150) + '...' : cleanContent);

    // 5. Save to Database
    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt: autoExcerpt,
      image: imagePath,
      author: author || 'Admin',
      tags: parsedTags,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || autoExcerpt,
      focusKeyword: focusKeyword || '',
      isPublished: isPublished === 'true' || isPublished === true,
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully!',
      blog,
    });
  } catch (error) {
    console.error("❌ CREATE BLOG ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Blogs (Public — Only Published)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .select('-content') // Content chhota karne ke liye (List page ke liye zaroori nahi)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Blog by Slug (Public)
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// ✅ Admin Functions
// ==========================================

// ✅ Get All Blogs (Admin — with Drafts + Pagination)
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const isPublished = req.query.isPublished;

    const skip = (page - 1) * limit;

    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (isPublished !== undefined && isPublished !== '') {
      filter.isPublished = isPublished === 'true';
    }

    const totalBlogs = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs,
        limit,
        hasNextPage: page < Math.ceil(totalBlogs / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Blog by ID (Admin)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, image: imageUrl, author, tags, metaTitle, metaDescription, focusKeyword, isPublished } = req.body;

    const updateData = {
      content,
      excerpt,
      author,
      metaTitle,
      metaDescription,
      focusKeyword,
      isPublished: isPublished !== undefined ? (isPublished !== false && isPublished !== 'false') : undefined,
    };

    // Image: File upload ya URL
    if (req.file) {
      updateData.image = req.file.path;
    } else if (imageUrl !== undefined && imageUrl !== '') {
      updateData.image = imageUrl;
    }

    // Update Title & Slug if title changes
    if (title) {
      updateData.title = title.trim();
      updateData.slug = generateSlug(title);
    }

    // Tags parsing
    if (tags) {
      updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog updated successfully', blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Toggle Publish Status
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: blog.isPublished ? 'Blog published' : 'Blog moved to draft',
      blog,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};