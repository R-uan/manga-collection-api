import cors from "cors";
import express from "express";
import { router } from "./routes";

export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
    app.use("/", router);

    return app;
}
