// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import compression from 'compression';
// import connectDB from './config/db.js';
// import categoryRoutes from './routes/categoryRoutes.js';

// // Routes
// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import couponRoutes from './routes/couponRoutes.js';
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from './routes/adminRoutes.js';
// import contentRoutes from './routes/contentRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import wishlistRoutes from './routes/wishlistRoutes.js';
// import reviewRoutes from './routes/reviewRoutes.js';

// // ✅ Security Middleware Imports (Rate limiters commented out / removed)
// import {
//     securityHeaders,
//     noSqlSanitize,
//     globalLimiter,
//     // authLimiter,
//     // adminLimiter,
//     sanitizeQueryParams,
//     sanitizeBody,
//     preventParameterPollution,
//     requestSizeLimiter,
//     preventSqlInjection
// } from './middleware/securityMiddleware.js';

// // Configuration
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();

// const app = express();

// app.set('trust proxy', 1);


// app.use(securityHeaders);

// // 2. Response Compression
// app.use(compression());

// // // 3. CORS setup with strict options
// // app.use(cors({
// //     origin: function(origin, callback) {
// //         const allowedOrigins = [
// //             'https://astrologyshop-eshop.vercel.app',
// //             'http://localhost:5174',
// //             'https://piyush-products.vercel.app',
// //             'https://thelootbazaar.vercel.app',
// //             'https://admin.yourdomain.com'
// //         ];
        
// //         if (!origin) return callback(null, true);
        
// //         if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
// //             callback(null, true);
// //         } else {
// //             callback(new Error('Not allowed by CORS'));
// //         }
// //     },
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// //     exposedHeaders: ['Content-Range', 'X-Content-Range'],
// //     maxAge: 600
// // }));


// // 3. CORS setup with strict options
// app.use(cors({
//     origin: function(origin, callback) {
//         const allowedOrigins = [
//             'https://astrologyshop-eshop.vercel.app',
//             'http://localhost:5173', // Vite default port
//             'http://localhost:5174',
//             'http://localhost:3000', // React default port
//             'https://piyush-products.vercel.app',
//             'https://thelootbazaar.vercel.app',
//             'https://admin.yourdomain.com'
//         ];
        
//         // Agar request Postman ya server-to-server (no origin) se hai toh allow karein
//         if (!origin) return callback(null, true);
        
//         // Agar origin allowed list me hai ya local environment hai
//         if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     exposedHeaders: ['Content-Range', 'X-Content-Range'],
//     maxAge: 600
// }));

// app.use(requestSizeLimiter);

// app.use(globalLimiter);

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use(noSqlSanitize);
// app.use(preventSqlInjection);
// app.use(sanitizeQueryParams);
// app.use(sanitizeBody);

// // 8. Prevent Parameter Pollution
// app.use(preventParameterPollution);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connectDB();


// app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/coupon', couponRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use("/api/user", userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/notifications', notificationRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         success: true,
//         status: 'OK',
//         message: '🚀 High-Performance Backend is running with full security!',
//         timestamp: new Date().toISOString()
//     });
// });


// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: `Route ${req.originalUrl} not found`,
//         timestamp: new Date().toISOString()
//     });
// });


// //   Global Error Handler (Updated)
// // =======================
// app.use((err, req, res, next) => {
//     console.error('❌ Global Error Caught:', err);
    
//     const errorMessage = err?.message || (typeof err === 'string' ? err : 'Internal Server Error');
//     const statusCode = err?.status || err?.statusCode || 500;
    
//     res.status(statusCode).json({
//         success: false,
//         message: errorMessage,
//         ...(process.env.NODE_ENV !== 'production' && { stack: err?.stack }),
//         timestamp: new Date().toISOString()
//     });
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`\n🔥 High-Scale Server started on port ${PORT}`);
//     console.log(`📡 Server is ready to handle high traffic!\n`);
// });



import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// ✅ Security Middleware Imports
import {
    securityHeaders,
    noSqlSanitize,
    globalLimiter,
    sanitizeQueryParams,
    sanitizeBody,
    preventParameterPollution,
    requestSizeLimiter,
    preventSqlInjection
} from './middleware/securityMiddleware.js';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.set('trust proxy', 1);

app.use(securityHeaders);

// 2. Response Compression
app.use(compression());

// 3. CORS setup with strict options
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'https://astrologyshop-eshop.vercel.app',
            'http://localhost:5173', // Vite default port
            'http://localhost:5174',
            'http://localhost:3000', // React default port
            'https://piyush-products.vercel.app',
            'https://thelootbazaar.vercel.app',
            'https://admin.yourdomain.com'
        ];
        
        // Agar request Postman ya server-to-server (no origin) se hai toh allow karein
        if (!origin) return callback(null, true);
        
        // Agar origin allowed list me hai ya local environment hai
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600
}));

// ✅✅✅ ZAROORI: Preflight (OPTIONS) requests handle karne ke liye ✅✅✅
app.options('*', cors());

app.use(requestSizeLimiter);
app.use(globalLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(noSqlSanitize);
app.use(preventSqlInjection);
app.use(sanitizeQueryParams);
app.use(sanitizeBody);

// 8. Prevent Parameter Pollution
app.use(preventParameterPollution);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/user", userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        status: 'OK',
        message: '🚀 High-Performance Backend is running with full security!',
        timestamp: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
    });
});

// =======================
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
    console.error('❌ Global Error Caught:', err);
    
    const errorMessage = err?.message || (typeof err === 'string' ? err : 'Internal Server Error');
    const statusCode = err?.status || err?.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV !== 'production' && { stack: err?.stack }),
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🔥 High-Scale Server started on port ${PORT}`);
    console.log(`📡 Server is ready to handle high traffic!\n`);
});