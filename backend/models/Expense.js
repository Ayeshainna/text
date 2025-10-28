import { model, Schema, Types } from "mongoose";

const ExpenseSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Expense = model("Expense", ExpenseSchema);
