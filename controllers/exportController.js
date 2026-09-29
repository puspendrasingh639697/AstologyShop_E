// controllers/exportController.js
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// ✅ Helper — Convert array to CSV
const convertToCSV = (data, headers) => {
  if (!data || data.length === 0) return '';

  const headerRow = headers.map((h) => h.label).join(',');

  const rows = data.map((item) => {
    return headers
      .map((h) => {
        const value = h.accessor(item);
        if (value === null || value === undefined) return '';
        // Escape commas and quotes
        const str = String(value).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(',');
  });

  return [headerRow, ...rows].join('\n');
};

// ✅ Export Users
export const exportUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').lean();

    const headers = [
      { label: 'Name', accessor: (u) => u.name },
      { label: 'Email', accessor: (u) => u.email },
      { label: 'Phone', accessor: (u) => u.phone || '' },
      { label: 'Role', accessor: (u) => u.role },
      { label: 'Status', accessor: (u) => (u.isActive !== false ? 'Active' : 'Blocked') },
      { label: 'Joined Date', accessor: (u) => new Date(u.createdAt).toLocaleDateString('en-IN') },
    ];

    const csv = convertToCSV(users, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=users_${Date.now()}.csv`
    );
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Export Orders
export const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();

    const headers = [
      { label: 'Order ID', accessor: (o) => o._id.toString() },
      { label: 'Customer Name', accessor: (o) => o.user?.name || 'N/A' },
      { label: 'Customer Email', accessor: (o) => o.user?.email || '' },
      { label: 'Items', accessor: (o) => (o.orderItems || []).map((i) => `${i.name} (x${i.qty})`).join(' | ') },
      { label: 'Total Amount', accessor: (o) => o.totalPrice || 0 },
      { label: 'Payment Method', accessor: (o) => o.paymentMethod || 'COD' },
      { label: 'Status', accessor: (o) => o.status || 'Processing' },
      {
        label: 'Shipping Address',
        accessor: (o) =>
          `${o.shippingAddress?.street || ''}, ${o.shippingAddress?.city || ''}, ${o.shippingAddress?.state || ''} - ${o.shippingAddress?.zipCode || ''}`,
      },
      { label: 'Order Date', accessor: (o) => new Date(o.createdAt).toLocaleDateString('en-IN') },
    ];

    const csv = convertToCSV(orders, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=orders_${Date.now()}.csv`
    );
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Export Products
export const exportProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category', 'name')
      .lean();

    const headers = [
      { label: 'Product Name', accessor: (p) => p.name },
      { label: 'Category', accessor: (p) => p.category?.name || 'Uncategorized' },
      { label: 'Price', accessor: (p) => p.price },
      { label: 'Stock', accessor: (p) => p.stock || 0 },
      { label: 'Status', accessor: (p) => (p.stock > 0 ? 'In Stock' : 'Out of Stock') },
      { label: 'Rating', accessor: (p) => p.rating || 0 },
      { label: 'Reviews', accessor: (p) => p.numReviews || 0 },
      { label: 'Created Date', accessor: (p) => new Date(p.createdAt).toLocaleDateString('en-IN') },
    ];

    const csv = convertToCSV(products, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=products_${Date.now()}.csv`
    );
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};