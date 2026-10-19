
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