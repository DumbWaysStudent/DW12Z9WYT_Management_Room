const models = require('../models');

const Order = models.order;
const Room = models.room;
const Customer = models.customer;

exports.show = (req, res) => {
  Room.findAll().then(data => {
    res.send(data);
  });
};

exports.addRoom = (req, res) => {
  Room.create({
    room_name: req.body.room_name,
  }).then(data => {
    console.log(data);
    res.send(data);
  });
};

exports.editRoom = (req, res) => {
  const {id} = req.params;
  Room.update(req.body, {where: {id: id}})
    .then(post => {
      res.send({
        message: 'success',
        post,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.showCheckin = (req, res) => {
  Room.findAll({
    include: [
      {
        model: Customer,
        as: 'customers',
        attributes: {exclude: ['createdAt', 'updatedAt']},
        through: {
          model: Order,
          where: {is_done: true},
          attributes: {exclude: ['createdAt', 'updatedAt']},
        },
      },
    ],
    attributes: {exclude: ['createdAt', 'updatedAt']},
  }).then(data => {
    res.send(data);
  });
};

exports.addCheckin = (req, res) => {
  const {guest_id, room_id, is_booked, is_done, duration} = req.body;

  const check_out = new Date() + duration;

  Order.create({
    guest_id,
    room_id,
    is_booked,
    is_done,
    duration,
    check_out,
  }).then(data => {
    res.send(data);
  });
};

exports.editCheckin = (req, res) => {
  const {id} = req.params;
  Order.update(req.body, {where: {id: id}})
    .then(post => {
      res.send({
        message: 'success',
        post,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
