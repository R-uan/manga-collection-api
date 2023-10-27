import mongoose from "mongoose";
const _schema = new mongoose.Schema({ title: String, author: String, genrer: String, pages: Number });
export default mongoose.model("book", _schema);
