const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskShema = new Schema({
    name: String,
    description: String,
    pomodoros: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Tasks", taskShema);
module.exports = Task;