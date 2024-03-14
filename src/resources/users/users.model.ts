const mongoose = require("mongoose");

// create a shema with mongoose schema allows to create a model and whatever we receive in the body of a request mongoose will only take the fields that are in the schema and ignore the rest

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  totalTimeSpend: { type: Number, default: 0 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profilePicture: String,
  tasks: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      taskName: String,
      description: String,
      numberOfPomodoroSet: Number,
      numberOfPomodoroDone: { type: Number, default: 0 },
      timeSpend: { type: Number, default: 0 },
      taskDone: { type: Boolean, default: false },
      creationDate: { type: Date, default: Date.now },
      displayTask: Boolean,
      status: { type: String, enum: ["active", "delete"], default: "active" },
    },
    { timestamps: true },
  ],
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
