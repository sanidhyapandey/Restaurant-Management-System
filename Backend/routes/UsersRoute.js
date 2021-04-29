const express = require('express');
const usersModel = require("../models/UsersModel");
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await usersModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/user', async (req, res) => {
    const user = new usersModel(req.body);
  
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  
  router.patch('/user/:id', async (req, res) => {
    try {
      const candidatedata = await usersModel.findByIdAndUpdate(
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