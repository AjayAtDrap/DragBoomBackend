import mongoose, { Schema, model } from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => {
    console.log("DB is Connencted ");
  })
  .catch((err) => {
    console.log("Error at Connecting to DB", err);
  });

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});
export default model("user", userSchema);
