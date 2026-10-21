import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // HTML from React Quill
    excerpt: { type: String, default: '' },
    image: { type: String, required: true }, // Cloudinary URL
    author: { type: String, default: 'Admin' },
    tags: [{ type: String }],

    // ✅ SEO Fields
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);