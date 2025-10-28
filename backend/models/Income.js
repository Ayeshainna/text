import { model, Schema, Types } from "mongoose";



const IncomeSchema = new Schema({
    userId: { type: Types.ObjectId, ref:"User", required: true},
    icon: { type:String},
    source: { type:String, required: true},   
    amount: { type:Number, required: true},
    date: { type:Date, default: Date.now},
}, {timestamps: true});

const Income = model("Income",IncomeSchema);
export { Income };

