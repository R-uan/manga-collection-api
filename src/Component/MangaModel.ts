import mongoose from "mongoose";

const _schema = new mongoose.Schema(
    {
        title: String,
        author: String,
        type: String,
        year: Number,
        status: String,
        genre: [String],
        synopse: String,
        cover: String,
        url: String,
    },
    {
        typeKey: "$type",
    }
);

export default mongoose.model("manga", _schema);
