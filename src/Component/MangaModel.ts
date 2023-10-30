import mongoose from "mongoose";

const _schema = new mongoose.Schema(
    {
        info: {
            title: String,
            author: String,
            type: String,
            year: Number,
            status: String,
            genre: [String],
            synopse: String,
        },
        link: {
            cover: String,
            url: String,
        },
        stats: {
            views: Number,
            reading: Number,
            planning: Number,
            dropped: Number,
            completed: Number,
        },
    },
    {
        typeKey: "$type",
    }
);

export default mongoose.model("manga", _schema);
