let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoDb = require("./database/db");

  const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
  /*mongodb+srv://Sagar:Ronaldo7Cristiano!@sagarcluster.hhrbv.mongodb.net/testlogin-app-db 
  Our Server and DB* which can be accessed by mongodb+srv://Sagar:Ronaldo7Cristiano!@sagarcluster.hhrbv.mongodb.net Over Mongodb Compass*/
  mongoose.connect('mongodb+srv://Sagar:Ronaldo7Cristiano!@sagarcluster.hhrbv.mongodb.net/testlogin-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })  
  .then(
    () => {
      console.log("Database sucessfully connected ");
    },
    (error) => {
      console.log("Database error: " + error);
    }
  );

const userRoute = require("./routes/user.routes");
const createError = require('http-errors');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, "dist/automaticVehicles")));

// API root
app.use("/api", userRoute);

// PORT
const port = process.env.PORT || 8000;
console.log(port);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/automaticVehicles/index.html"));
}); */

// error handler
app.use(function (err, req, res, next) {
  console.error("OK",err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
