const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const Reviews = require("./models/reviewsModel");
const bodyParser = require("body-parser");
const PORT = 3000;


mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/reviews", async (req, res) => {
  try {
    const reviews = await Reviews.create({
      fullName: req.body.fullName,
      location: req.body.location,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      touristCenterVisited: req.body.touristCenterVisited,
      review: req.body.review,
    });

    res.status(200).json({
        status: 'success',
        data: reviews
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/home', async(req,res) => {
    try {
        const allReviews = await Reviews.find().sort({createdAt : -1})
        res.status(200).json({
            status: 'success',
            data: allReviews
        })
    } catch (error) {
       res.status(500).json(error)
    }
});

app.listen(PORT, () => [console.log(`SERVER CONNECTED AND RUNNING ON PORT ${PORT}`)]);