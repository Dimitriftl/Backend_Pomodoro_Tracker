"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskShema = new Schema({
    id: String,
    name: String,
    description: String,
    numberOfPomodoroSet: Number,
    numberOfPomodoroDone: Number,
    timeSpend: Number,
    taskDone: Boolean,
    creationDate: { type: Date, default: Date.now },
    displayTask: Boolean,
});
const Task = mongoose.model("Tasks", taskShema);
module.exports = Task;
