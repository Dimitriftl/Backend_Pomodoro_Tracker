const mongoose = require("mongoose");

// create a shema with mongoose schema allows to create a model and whatever we receive in the body of a request mongoose will only take the fields that are in the schema and ignore the rest

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"] },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
