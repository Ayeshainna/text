import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";



const UserSchema = new Schema({
  fullName: { type: String, required: true },   // fixed property name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: null },
}, { timestamps: true });


// Hash password before saving
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next ();
    this.password = await bcrypt.hash(this.password,10);
    next();
    
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = model("User",UserSchema);
