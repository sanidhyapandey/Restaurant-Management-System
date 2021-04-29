require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const usersModel = require("../models/UsersModel");
const router = express.Router();

router.get('/posts', authenticateToken, async (req, res) => {
 

  try {
    const posts = await usersModel.find({});
    res.json(posts.filter(post => post.email === req.username.email && post.password === req.username.password))
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {

    try {

        const username =
            await usersModel.findOne({
                email: req.body.email,
                password: req.body.password

            });
        console.log(username);
        const accessToken = jwt.sign(username.toJSON(), process.env.ACCESS_TOKEN_SECRET);

        res.send({
            access_token : accessToken
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
        return;
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