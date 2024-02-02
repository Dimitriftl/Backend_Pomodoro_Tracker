const mongoose = require("mongoose");
const taskModel = require("../tasks/tasks.model");

// create a shema with mongoose schema allows to create a model and whatever we receive in the body of a request mongoose will only take the fields that are in the schema and ignore the rest

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  tasks: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      name: String,
      description: String,
      numberOfPomodoroSet: Number,
      numberOfPomodoroDone: Number,
      timeSpend: Number,
      taskDone: { type: Boolean, default: false },
      creationDate: { type: Date, default: Date.now },
      displayTask: Boolean,
      status: { type: String, enum: ["active", "delete"], default: "active" },
    },
  ],
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
