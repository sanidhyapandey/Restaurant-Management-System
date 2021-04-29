const express = require('express');
const dinersModel = require("../models/Diner_tableModel");
const jwt = require('jsonwebtoken');
const CONSTANTS = require("../constants");
const router = express.Router();

router.get('/diners', async (req, res) => {
  const diners = await dinersModel.find({});

  try {
    res.send(diners);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/diner', authenticateToken, async (req, res) => { //middleware
  if (req.username.user_type === CONSTANTS.USER_TYPE.MANAGER) {
    const diner = new dinersModel(req.body);

    try {
      await diner.save();
      res.send(diner);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  else {
    
    res.status(403).send({message : 'Its not a manager'})
  }
});
router.patch('/diner/:id', async (req, res) => {
  try {
    const candidatedata = await dinersModel.findByIdAndUpdate(
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