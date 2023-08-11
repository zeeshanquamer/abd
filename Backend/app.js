const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userModel } = require("./models/user.model");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (name == "" || email == "" || message == "") {
    return res.json({ msg: "please fill correctly" });
  }

  try {
   
      const user = new userModel({
        name,
        email,
        message,
      });
      await user.save();
      res.status(200).send({ msg: "your is created successfully", user: user });
    
  } catch (error) {
    res.status(404).send({ msg: " something went wrong" });
  }
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected with db");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running at PORT 8080");
});
