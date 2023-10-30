import cors from "cors";
import book from "./Component/MangaModel";
import express from "express";
import mongoose from "mongoose";
import Controller from "./Component/MangaController";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.get("/books", async (req, res) => {
    res.json(await book.find());
});

app.get("/books/search-:option-:input", async (req, res) => {
    res.json(await Controller.findByTitleOrAuthor({ option: req.params.option, input: req.params.input }));
});

app.post("/books", async (req, res) => {
    res.json(await Controller.saveOneManga(req.body));
});

mongoose.connect("mongodb://127.0.0.1:27017/admin-panel");
app.listen(8080, () => console.log("yepi"));
