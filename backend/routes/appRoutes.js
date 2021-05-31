const { Router } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


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

  const { username, password: plainTextPassword } = req.body


  if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

  const user = new User({
    username: req.body.username,
    password: password,
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

//Register User
router.route('/register').post(async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

//Login
router.route('/login').post(async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()
  console.log(user);
	if (!user) {
		return res.status(401).send({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.send({ status: 'ok', data: user, token: token })
	}

	res.status(401).send({ status: 'error', error: 'Invalid username/password' })
})

//Patch query for ignition
router.route('/update/:id').patch(async (req, response, next)=>{
  console.log(req.body, req.params);
  try{
    await User.findByIdAndUpdate(req.params.id, req.body, (error, res, data)=>{
      console.log(res, data);
      if (error) {
        return next(error)
      } else {
        response.json(res)
      }
    });
  } catch(err){
    response.status(500).send({status:'error', error:'Something went wrong'})
  }

})

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
