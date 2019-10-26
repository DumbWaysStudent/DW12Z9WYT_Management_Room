require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 2019;

app.use(bodyParser.json());

const AuthController = require("./controllers/auth");
const RoomControllers = require("./controllers/rooms");
const GuestControllers = require("./controllers/customer");

app.group("/api/v2", router => {
  // TES API
  router.get("/", (req, res) => {
    res.send("Hello ini adalah aplikasi Booking");
  });

  //Login & Register
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);

  //Get All Rooms
  router.get("/rooms", RoomControllers.show);
  router.post("/room", RoomControllers.addRoom);
  router.put("/room/:id", RoomControllers.editRoom);

  // Customer
  router.get("/customers", GuestControllers.showGuest);
  router.post("/customer", GuestControllers.addGuest);
  router.put("/customer/:id", GuestControllers.editGuest);
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
