const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String },
  message: { type: String },
 
});

const userModel = new mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
