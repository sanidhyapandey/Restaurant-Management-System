const express = require('express');
const reservationsModel = require("../models/ReservationModel");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/reservations', async (req, res) => {
  const reservations = await reservationsModel.find({});

  try {
    res.send(reservations);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/reservation', authenticateToken, async (req, res) => {
  try {

    const prev_res = await reservationsModel.findOne({
      res_time: req.body.res_time,
      table_id: req.body.table_id
    });

    if (!prev_res) {
      const reservation = new reservationsModel(req.body);
      await reservation.save();
      res.status(201).send(reservation);
    } else {
      res.status(400).send({
        message: "Reservation already exsists for Table and Time"
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/reservation/:id', async (req, res) => {
  try {
    const reservation = await reservationsModel.findByIdAndDelete(req.params.id)

    if (!reservation) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})


router.patch('/reservation/:id', async (req, res) => {
  try {
    const candidatedata = await reservationsModel.findByIdAndUpdate(
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