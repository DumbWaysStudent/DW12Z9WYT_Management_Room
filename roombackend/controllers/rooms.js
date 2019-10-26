const models = require("../models");

const User = models.user;
const Room = models.room;

exports.show = (req, res) => {
  Room.findAll().then(data => {
    res.send(data);
  });
};

exports.addRoom = (req, res) => {
  Room.create({
    room_name: req.body.room_name
  }).then(data => {
    console.log(data);
    res.send(data);
  });
};

exports.editRoom = (req, res) => {
  const { id } = req.params;
  Room.update(req.body, { where: { id: id } })
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
