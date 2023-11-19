import { Manga } from "../Datatypes/_Manga";
import MangaRepository from "./MangaService";
import { Info } from "../Datatypes/Info";
import { Link } from "../Datatypes/Link";
import { Stats } from "../Datatypes/Stats";
import { Request, Response } from "express";

export default abstract class MangaController {
    public static async getAll(req: Request, res: Response) {
        res.send(await MangaRepository.getAll());
    }

    public static async findByTitleOrAuthor(req: Request, res: Response) {
        let response;
        let input = req.params.input;
        const option = req.params.option;
        input = input!.split("+").join(" ");

        if (option === "title") {
            response = await MangaRepository.findByTitle(input);
        } else if (option === "author") {
            response = await MangaRepository.findByAuthor(input);
        } else res.status(400);

        if (response!.length == 0) res.status(404);

        res.send(response);
    }

    public static async saveOneManga(req: Request, res: Response) {
        const body = req.body;
        const info = new Info(
            body.title,
            body.author,
            body.type,
            body.year,
            body.status,
            body.genre,
            body.synopse
        );
        const link = new Link(body.cover, body.url);
        const stats = new Stats();

        res.send(await MangaRepository.saveManga({ info, link, stats }));
    }

    public static async deleteOneManga(req: Request, res: Response) {
        const id = req.params.id!;
        const response = await MangaRepository.deleteManga(id);
        if (id == "null") res.status(400);
        res.send(response);
    }

    public static async updateManga(req: Request, res: Response) {
        const id = req.params.id!;
        const body = req.body;
        if (id == "null") res.status(400);
        let response = await MangaRepository.updateManga(id, body);

        res.send(response);
    }
}
