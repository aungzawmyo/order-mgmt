const Order = require("../../models/order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getOrderbyCustomer = async (req, res) => {
    try {
      const { cid } = req.params;
      const order = await Order.find({"customerId":cid});
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getOrderbyTrackNo = async (req, res) => {
    try {
      const { tno } = req.params;
      const order = await Order.find({"trackNo":tno});
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const generateUniqueId=() =>{
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    const uniqueId = randomString + timestamp;
    return uniqueId;
  }
  
const createOrder = async (req, res) => {
  try {
    const trackNumber = generateUniqueId();

    const newOrder = {};
    newOrder.productId = req.body.productId;
    newOrder.customerId = req.body.customerId;
    newOrder.customerAddress = req.body.customerAddress;
    newOrder.paymentType = req.body.paymentType;
    newOrder.price = req.body.price;
    newOrder.trackNo = trackNumber;
    newOrder.quantity = req.body.quantity;
    newOrder.total = req.body.total;

    const order = await Order.create(newOrder);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const newOrder = {};
    newOrder.status = req.body.status; 
    
    const order = await Order.findByIdAndUpdate(id, newOrder);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findById(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const newOrder = {};
    newOrder.status = "Cancelled"; 
    
    const order = await Order.findByIdAndUpdate(id, newOrder);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findById(id);
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    getOrders,
    getOrder,
    getOrderbyCustomer,
    getOrderbyTrackNo,
    createOrder,
    updateOrder,
    cancelOrder,
};
