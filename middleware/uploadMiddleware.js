

// // // import multer from 'multer';
// // // import { v2 as cloudinary } from 'cloudinary';
// // // import { CloudinaryStorage } from 'multer-storage-cloudinary';

// // // // Direct keys dalkar check karo
// // // cloudinary.config({
// // //     cloud_name:'qcqig88l',
// // //     api_key:'578776415224168',
// // //     api_secret:'vPlPanNxP96q4wUjxgBg8h6o408'
// // // });


// // // const storage = new CloudinaryStorage({
// // //     cloudinary: cloudinary,
// // //     params: {
// // //         folder: 'product_images',
// // //         allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
// // //     },
// // // });

// // // const upload = multer({ storage: storage });
// // // export default upload;

// // // middleware/uploadMiddleware.js
// // import multer from 'multer';
// // import { v2 as cloudinary } from 'cloudinary';
// // import { CloudinaryStorage } from 'multer-storage-cloudinary';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qcqig88l',
// //   api_key: process.env.CLOUDINARY_API_KEY || '578776415224168',
// //   api_secret: process.env.CLOUDINARY_API_SECRET || 'vPlPanNxP96q4wUjxgBg8h6o408',
// // });

// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: 'product_images',
// //     allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
// //   },
// // });

// // const upload = multer({ storage: storage });
// // export default upload;

// // middleware/uploadMiddleware.js
// import multer from 'multer';

// // ✅ Memory storage use karo — Cloudinary SDK baad mein upload karega
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },   // 5MB
// });



// export default upload;


// middleware/uploadMiddleware.js
import multer from 'multer';

// ✅ Memory storage use karo — Cloudinary SDK baad mein upload karega
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },   // 5MB
  fileFilter: (req, file, cb) => {
    // ✅ Saare image formats allow karo
    const allowedTypes = /jpeg|jpg|png|webp|gif|jfif/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpg, jpeg, png, webp, gif, jfif)'));
    }
  },
});

export default upload;