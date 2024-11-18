import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    singer: {
      type: String,
      require: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    audio: {
      id: String,
      url: String,
    },
    album: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Song = mongoose.model("Song", schema);
