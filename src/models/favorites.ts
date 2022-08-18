import mongoose from "mongoose";

let schema = new mongoose.Schema({
  user: {
    type: String,
  },
  favorites: [
    {
      showId: {
        type: String,
        required: true,
      },
      showType: {
        type: String,
        unique: true,
      },
    },
  ],
});

const favoritesModel =
  mongoose.models.favorite || mongoose.model("favorite", schema);

export { favoritesModel };
