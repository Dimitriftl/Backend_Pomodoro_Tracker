const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskShema = new Schema({
    userId: String,
	name: String,
	description: String,
	numberOfPomodoroSet: Number ,
    numberOfPomodoroDone : Number,
	timeSpend: Number,
	taskDone: Boolean,
	creationDate: Date,
	displayTask: Boolean
});

const Task = mongoose.model("Tasks", taskShema);
module.exports = Task;