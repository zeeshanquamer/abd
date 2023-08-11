const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://zeeshanreport:Zeeshan123@cluster0.gfgkzra.mongodb.net/FSJuly?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
