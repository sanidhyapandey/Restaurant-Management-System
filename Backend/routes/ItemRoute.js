const express = require('express');
const itemsModel = require("../models/ItemModel");
const router = express.Router();

router.get('/items', async (req, res) => {
  const items = await itemsModel.find({});

  try {
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/item', async (req, res) => {
    const item = new itemsModel(req.body);
  
    try {
      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.patch('/item/:id', async (req, res) => {
    try {
      const candidatedata = await itemsModel.findByIdAndUpdate(
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