const mongoose = require("mongoose");

//Vehicle info schema
const vehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  ignitionStatus: {
    type: Boolean,
    required: true,
  },
  flashlight: {
    type: Boolean,
    required: true,
  },
  frontLeftLock: {
    type: Boolean,
    required: true,
  },
  frontRightLock: {
    type: Boolean,
    required: true,
  },
  backLeftLock: {
    type: Boolean,
    required: true,
  },
  backRightLock: {
    type: Boolean,
    required: true,
  },
  drivingMode: {
    type: String
  },
  trunk:{
    type: Boolean
  },
  seatWarmerFL:{
    type: Boolean
  },
  seatWarmerFR:{
    type: Boolean
  },
  seatWarmerBL:{
    type: Boolean
  },
  seatWarmerBR:{
    type: Boolean
  },
  ac:{
    type: Boolean
  },
  roofTop:{
    type: Boolean
  },
  seatOccupiedFL:{
    type: Boolean
  },
  seatOccupiedFR:{
    type: Boolean
  },
  seatOccupiedBL:{
    type: Boolean
  },
  seatOccupiedBR:{
    type: Boolean
  }
});

//Health check params
const healthSchema = new mongoose.Schema({
  batteryPercentRemaining: {
    type: String,
  },
  distanceCoverIconomyMode: {
    type: Number
  },
  distanceCoverInSpeed:{
    type: Number
  },
  engineHealth:{
    type: String
  },
  isPluggedIn: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  backLeft: {
    type: Number,
  },
  backRight: {
    type: Number,
  },
  frontLeft: {
    type: Number,
  },
  frontRight: {
    type: Number,
  },
  distanceCoverInFullHealth: {
    type: Number
  },
  timeCoverInFullHealth:{
    type: Number
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  vehicleInfo: {
    type: vehicleSchema,
  },
  description: {
    type: String,
  },
  healthCheck: {
    type: healthSchema,
  },
});

module.exports = mongoose.model("User", userSchema);
