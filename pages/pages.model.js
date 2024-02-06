import { Schema, model } from "mongoose";

const pageSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);
export default model("page", pageSchema);
