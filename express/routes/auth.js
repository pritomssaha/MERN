const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

router.post("/login", async (req, res) => {
  //verify email, verify password,

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.send("invalid email");
  else {
    const passwordVerification = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(req.body.password);
    console.log(user.password);
    if (!passwordVerification) return res.send("login failed");
    const token = jwt.sign({ email: user._id }, process.env.sercretKey);
    user.password = undefined;
    return res.json({ body: user, token: token });
  }
});

module.exports = router;
