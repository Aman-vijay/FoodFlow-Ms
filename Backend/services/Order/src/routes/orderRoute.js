const express = require("express");
const {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const fetchDetails = require("../middleware/fetchdetails")

const orderRouter = express.Router();

orderRouter.post('/create',fetchDetails,  createOrder);
orderRouter.get('/', fetchDetails, getOrdersByUser);
orderRouter.get('/:orderId', fetchDetails, getOrderById);
orderRouter.patch('/status/:orderId', updateOrderStatus); 

module.exports = orderRouter
