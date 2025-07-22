import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose.connect(url)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(" Connection error:", error?.message);
  });
