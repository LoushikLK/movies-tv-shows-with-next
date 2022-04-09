import mongoose from "mongoose";

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
  },
  favorites: [
    {
      type: String,
      id: Number,
    },
  ],
  watch_list: [
    {
      type: String,
      id: Number,
    },
  ],
});

const userModel = mongoose.models.user || mongoose.model("user", schema);

export { userModel };
