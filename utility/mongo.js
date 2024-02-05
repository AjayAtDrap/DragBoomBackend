import mongoose from "mongoose";
const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is Connected");
  } catch (err) {
    console.log("Error at DB Connection");
  }
};

export default mongo;
