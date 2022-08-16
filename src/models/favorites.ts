import mongoose from "mongoose";

let schema = new mongoose.Schema({
  user: {
    type: String,
    ref: "user",
  },
  favorites: [
    {
      showId: {
        type: String,
        required: true,
      },
      showType: {
        type: String,
      },
    },
  ],
});

const favoritesModel =
  mongoose.models.favorite || mongoose.model("favorite", schema);

export { favoritesModel };
