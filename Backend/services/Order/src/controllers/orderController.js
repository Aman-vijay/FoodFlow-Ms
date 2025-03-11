const Order = require("../models/Order")
const mongoose = require('mongoose');

// @desc Place a new order
 const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, deliveryAddress } = req.body;
    const userId = req.user?.id; // fetched from middleware

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      deliveryAddress,
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc Get all orders for the logged-in user
 const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });
  } catch (err) {
    console.error('Error fetching order:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc Update order status (admin or automated ops)
 const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, ...(status === 'delivered' && { deliveredAt: new Date() }) },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error('Error updating order status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    updateOrderStatus,
    getOrderById,
    createOrder,
    getOrdersByUser 


}
