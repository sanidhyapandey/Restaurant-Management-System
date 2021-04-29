const express = require('express');
const ordersModel = require("../models/OrdersModel");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/orders', async (req, res) => {
  const orders = await ordersModel.find({}).populate({
    path: "items",
    select: "price name quantity"
  });

  try {
    res.send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/order', authenticateToken, async (req, res) => {
    const order = new ordersModel(req.body);
  
    try {
      await order.save();
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.patch('/orders/:id', async (req, res) => {
    try {
      const candidatedata = await ordersModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).send(candidatedata);
      // await foodModel.findByIdAndUpdate(req.params.id, req.body)
      // await foodModel.save()
      // res.send(food)
    } catch (err) {
      res.status(500).send(err)
    }
  });

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, username) => {
        if (err) return res.sendStatus(403)
        req.username = username
        next()
    })
  }

module.exports = router;