import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart); // Add ya Increment
router.get('/:userId', getCart); // Puri cart dekhne ke liye
router.put('/update', updateCartQuantity); // Quantity change ke liye
router.delete('/remove/:userId/:productId', removeFromCart); // Delete ke liye

export default router;