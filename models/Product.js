// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true }, // 👈 Yeh line zaroor add karein
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // 👈 Isko String se ObjectId kar dein taaki category properly link ho
//     stock: { type: Number, required: true, default: 0 }, 
//     image: { type: String, required: true },
//     reviews: [
//         {
//             user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//             name: { type: String, required: true },
//             rating: { type: Number, required: true },
//             comment: { type: String, required: true },
//         }
//     ],
//     numReviews: { type: Number, default: 0 },
//     rating: { type: Number, default: 0 }
// }, { timestamps: true });

// export default mongoose.model('Product', productSchema);


// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    // ✅ PRICE FIELDS
    price: { type: Number, required: true },
    mrp: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);