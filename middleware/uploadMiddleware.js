
// import multer from 'multer';

// // ✅ Memory storage use karo — Cloudinary SDK baad mein upload karega
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },   // 5MB
//   fileFilter: (req, file, cb) => {
//     // ✅ Saare image formats allow karo
//     const allowedTypes = /jpeg|jpg|png|webp|gif|jfif/;
//     const extname = allowedTypes.test(file.originalname.toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed (jpg, jpeg, png, webp, gif, jfif)'));
//     }
//   },
// });

// export default upload;


import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aaradhya_blogs', // Cloudinary mein folder ka naam
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'jfif', 'gif'],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;