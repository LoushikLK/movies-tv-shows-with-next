import mongoose from "mongoose";

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
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
  favorites: {
    type: String,
    ref: "favorite",
  },
  watch_list: {
    type: String,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", schema);

export { userModel };
