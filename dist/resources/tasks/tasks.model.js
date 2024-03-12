"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskShema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    taskName: String,
    description: String,
    numberOfPomodoroSet: Number,
    numberOfPomodoroDone: Number,
    timeSpend: Number,
    taskDone: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now },
    displayTask: Boolean,
    status: { type: String, enum: ["active", "delete"], default: "active" },
}, { timestamps: true });
const Task = mongoose.model("Tasks", taskShema);
module.exports = Task;
