const express = require('express');
const foodModel = require("../models/FoodModel");
const router = express.Router();

router.get('/foods', async (req, res) => {
  const foods = await foodModel.find({});

  try {
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/food', async (req, res) => {
    const food = new foodModel(req.body);
  
    try {
      await food.save();
      res.send(food);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.patch('/food/:id', async (req, res) => {
    try {
      const candidatedata = await foodModel.findByIdAndUpdate(
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

module.exports = router;