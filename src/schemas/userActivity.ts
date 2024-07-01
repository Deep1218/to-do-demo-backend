import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

export interface UserActivityDocument extends Document {
  userId: ObjectId;
  token: string;
}

const userActivitySchema: Schema<UserActivityDocument> = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserActivityModel = mongoose.model<UserActivityDocument>(
  "user_activities",
  userActivitySchema
);
