const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verify");

const UserModel = require("../models/User");

//to hash a password 1. generate a salt 2. hash a password

// router.get("/token", (req, res) => {
//   const token = jwt.sign({ _id: 123123 }, process.env.sercretKey);
//   res.send(token);
// });

router.post("/add", async (req, res) => {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.send(error.details[0].message);
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // user.save((err, response) => {
    //   if (err) res.send(err);
    //   else res.send(response);
    // });

    //   user
    //     .save()
    //     .then((resp) => res.send(resp))
    //     .catch((err) => res.send(err));
    // });

    const save = await user.save();

    try {
      res.send(save);
    } catch (err) {
      res.send(err);
    }
  }
});

router.get("/loadall", verifyToken, async (req, res) => {
  const users = await UserModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/load/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);

  try {
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.deleteOne({
    _id: id,
  });

  try {
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.updateOne({
    _id: id,
    $set: req.body,
  });
  try {
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
