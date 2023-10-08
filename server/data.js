const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

async function connectDB() {
  try {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(MONGODB_URI, options);
    console.log(`Connected to database: ${db.connection.name}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = connectDB;

