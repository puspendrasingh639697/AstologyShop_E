// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     // Aap isko generic rakh sakte hain: targetId aur targetModel (Product/Astrologer)
//     targetId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         refPath: 'targetModel'
//     },
//     targetModel: {
//         type: String,
//         required: true,
//         enum: ['Product', 'Astrologer', 'Service'] // Jiske liye bhi review ho
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5
//     },
//     comment: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 500
//     }
// }, { timestamps: true });

// // Ek user ek target par sirf ek hi review de sake (Optional restriction)
// reviewSchema.index({ user: 1, targetId: 1 }, { unique: true });

// const Review = mongoose.model('Review', reviewSchema);
// export default Review;

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'targetModel'
    },
    targetModel: {
        type: String,
        required: true,
        enum: ['Product', 'Astrologer', 'Service']
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },

    // ✅ ADD — Admin approval ke liye
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

    // ✅ ADD — Admin reply
    adminReply: {
        type: String,
        default: '',
        maxlength: 500
    },
    repliedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

reviewSchema.index({ user: 1, targetId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;