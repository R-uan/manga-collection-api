import "dotenv/config";
import mongoose from "mongoose";
import createServer from "./Util/server";

const app = createServer();
const uri = process.env.MONGO_URI!;

app.listen(8080, () => {
    mongoose.connect("mongodb://127.0.0.1:27017/admin-panel");
    console.log("yepi");
});
