const mongoose = require("mongoose");

module.exports = async () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mzvon6w.mongodb.net/pomodoro_tracker?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      dbName: "Pomodoro_tracker",
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
