const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.user;
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) {
      const authorize = bcrypt.compareSync(req.body.password, user.password);

      if (authorize) {
        const token = jwt.sign({ id: user.id }, "my-secret-key");

        res.send({
          id: user.id,
          email: user.email,
          token
        });
      } else {
        res.status(201).send({
          message: "Validation error: Wrong password!"
        });
      }
    } else {
      res.status(201).send({
        message: "Validation error: Unregistered email!"
      });
    }
  });
};

exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "my-secret-key");
      res.send({
        id: user.id,
        email: user.email,
        register: "Succesfull",
        token
      });
    }
  });
};
