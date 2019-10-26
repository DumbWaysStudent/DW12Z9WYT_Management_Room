const models = require("../models");

const Guest = models.customer;

exports.showGuest = (req, res) => {
  Guest.findAll().then(data => {
    res.send(data);
  });
};

exports.addGuest = (req, res) => {
  Guest.create({
    identity_number: req.body.identity_number,
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image
  }).then(data => {
    console.log(data);
    res.send(data);
  });
};

exports.editGuest = (req, res) => {
  const { id } = req.params;
  Guest.update(req.body, { where: { id: id } })
    .then(post => {
      res.send({
        message: "success",
        post
      });
    })
    .catch(err => {
      console.log(err);
    });
};
