const mongoose = require("mongoose");

const connectDB = () => mongoose.connect(process.env.MONGO_URI);

module.exports = connectDB;
