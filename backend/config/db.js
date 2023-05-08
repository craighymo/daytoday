const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDB = async () => {
  const mongo = process.env.DB_URI;
  try {
    await mongoose.connect(mongo);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
