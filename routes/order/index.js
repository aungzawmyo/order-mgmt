const express = require("express");
const Product = require("../../models/order.js");
const router = express.Router();
const {getOrders, getOrder,getOrderbyCustomer,getOrderbyTrackNo, createOrder, updateOrder,cancelOrder} = require('../../Controllers/order/order.js');


router.get('/', getOrders);
router.get("/:id", getOrder);
router.get("/customer/:cid", getOrderbyCustomer);
router.get("/track/:tno", getOrderbyTrackNo);

router.post("/", createOrder);

router.put("/:id", updateOrder);
router.put("/cancel/:id", cancelOrder);

module.exports = router;