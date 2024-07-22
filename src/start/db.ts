import mongoose from "mongoose";

module.exports = () =>
  mongoose
    .connect(process.env.MONGODB_URL!)
    .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
