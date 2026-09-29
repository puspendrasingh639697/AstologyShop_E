


import Review from '../models/Review.js';
import Product from '../models/Product.js';

// ==========================================
// ✅ EXISTING FUNCTIONS (Same rahenge)
// ==========================================

// ✅ 1. Add or Update Review
export const addReview = async (req, res) => {
  try {
    const { targetId, targetModel, rating, comment } = req.body;
    const userId = req.user._id;

    if (!targetId || !targetModel || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    let review = await Review.findOne({ user: userId, targetId });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      review.status = 'pending';   // ✅ Edit par status pending
      await review.save();
      return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        review
      });
    }

    review = await Review.create({
      user: userId,
      targetId,
      targetModel,
      rating,
      comment,
      status: 'pending'   // ✅ New review pending
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Get Reviews for a Specific Target (Only approved for public)
export const getReviewsByTarget = async (req, res) => {
  try {
    const { targetId } = req.params;

    const reviews = await Review.find({
      targetId,
      status: 'approved'   // ✅ Sirf approved reviews public
    })
      .populate('user', 'name profilePic')
      .sort({ createdAt: -1 });

    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
      averageRating = (sum / reviews.length).toFixed(1);
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      averageRating,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3. Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && !['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await review.deleteOne();

    // ✅ Update product rating
    if (review.targetModel === 'Product') {
      await updateProductRating(review.targetId);
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.comment = { $regex: search, $options: 'i' };
    }

    const totalReviews = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .populate('user', 'name email')
      .populate({
        path: 'targetId',
        select: 'name image price',   // ✅ Product ke fields
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews,
        limit,
        hasNextPage: page < Math.ceil(totalReviews / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.log('Get all reviews error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ 5. Approve Review
export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // ✅ Update product rating
    if (review.targetModel === 'Product') {
      await updateProductRating(review.targetId);
    }

    res.json({ success: true, message: 'Review approved ✅', review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ 6. Reject Review
export const rejectReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // ✅ Update product rating
    if (review.targetModel === 'Product') {
      await updateProductRating(review.targetId);
    }

    res.json({ success: true, message: 'Review rejected', review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ 7. Reply to Review
export const replyToReview = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ success: false, message: 'Reply text required' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { adminReply: reply, repliedAt: new Date() },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Reply added ✅', review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Helper — Update Product Rating
const updateProductRating = async (productId) => {
  try {
    const reviews = await Review.find({
      targetId: productId,
      targetModel: 'Product',
      status: 'approved',
    });

    const numReviews = reviews.length;
    const rating =
      numReviews > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews
        : 0;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(rating.toFixed(1)),
      numReviews,
    });
  } catch (err) {
    console.error('Update product rating error:', err.message);
  }
};

// ✅ 4b. Get logged-in user's own reviews (My Reviews)
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log('🔍 Fetching reviews for user:', userId);

    const reviews = await Review.find({ user: userId })
      .populate({
        path: 'targetId',
        select: 'name image price slug',
      })
      .sort({ createdAt: -1 });

    console.log('✅ Found reviews:', reviews.length);

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (err) {
    console.error('❌ Get my reviews error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};