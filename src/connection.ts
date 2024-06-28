import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_STRING: any = process.env.DB_STRING;

export const db = async () => {
  try {
    const con = await mongoose.connect(DB_STRING);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error("Database connection error", error);
  }
};
