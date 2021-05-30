const express = require("express");
const router = express.Router();
const User = require("../models/user");


//Get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Get one
/* router.get("/:id", getUser, (req, res) => {
  console.log(res.user)
  res.json(res.user)
}); */

// get user by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    console.log(data);
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

//Create
router.post("/", async (req, res) => {
  console.log(req);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    description: req.body.description,
    vehicleInfo: {
      vehicleNo: req.body.vehicleInfo.vehicleNo,
      make: req.body.vehicleInfo.make,
      model: req.body.vehicleInfo.model,
      year: req.body.vehicleInfo.year,
      ignitionStatus: req.body.vehicleInfo.flashlight,
      flashlight: req.body.vehicleInfo.flashlight,
      frontLeftLock: req.body.vehicleInfo.frontLeftLock,
      frontRightLock: req.body.vehicleInfo.frontRightLock,
      backLeftLock: req.body.vehicleInfo.backLeftLock,
      backRightLock:req.body.vehicleInfo.backRightLock
    },
    healthCheck: {
      batteryPercentRemaining: req.body.healthCheck.batteryPercentRemaining,
      isPluggedIn: req.body.healthCheck.isPluggedIn,
      status: req.body.healthCheck.status,
      backLeft: req.body.healthCheck.backLeft,
      backRight: req.body.healthCheck.backRight,
      frontLeft:req.body.healthCheck.frontLeft,
      frontRight: req.body.healthCheck.frontRight
    }
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user
  try {
    const user = await User.findById(req.param._id);
    if (user == null) {
      return res.status(404).json({ message: "Can not find user" });
    }
  } catch (err) {
    return res.status(500).json({message:err.message})
  }
  res.user = user
  next()
}

module.exports = router;
