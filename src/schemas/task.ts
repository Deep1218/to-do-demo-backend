import { ObjectId } from "mongodb";
import { Schema, Document, model } from "mongoose";

export interface TaskDocument extends Document {
  userId: ObjectId;
  title: string;
  description: string;
  status: string;
  date: Date;
}

const taskSchema: Schema<TaskDocument> = new Schema(
  {
    userId: {
      type: ObjectId,
      require: true,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const TaskModel = model<TaskDocument>("tasks", taskSchema);
