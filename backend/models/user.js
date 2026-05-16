import mongoose from "mongoose";
const { Schema } = mongoose;

import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
