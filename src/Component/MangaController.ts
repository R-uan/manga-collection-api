import { MangaObj } from "../Datatypes/Manga";
import MangaService from "./MangaService";
import { Request, Response } from "express";
import { logger } from "../Util/logger";

export default abstract class MangaController {
    public static async getAll(req: Request, res: Response) {
        try {
            res.send(await MangaService.getAll());
        } catch (error) {
            res.status(500).json({ message: `Internal Error`, error });
        }
    }

    public static async findByTitleOrAuthor(req: Request, res: Response) {
        try {
            let response;
            let input = req.params.input;
            const option = req.params.option;
            input = input!.split("+").join(" ");

            if (option === "title") {
                response = await MangaService.findByTitle(input);
            } else if (option === "author") {
                response = await MangaService.findByAuthor(input);
            } else {
                logger.error(`GET TITLE - BAD REQUEST - /mangas/search-${option}-${input}`);
                res.status(400);
            }

            if (response!.length == 0) {
                logger.info(`GET TITLE - NOT FOUND - /mangas/search-${option}-${input}`);
                res.status(404).json({ message: `${input} not found!` });
            } else {
                res.json(response);
            }
        } catch (error) {
            res.status(500).json({ message: `Internal Error`, error });
        }
    }

    public static async saveOneManga(req: Request, res: Response) {
        try {
            const body = req.body;
            for (const key in body) if (!body[key]) delete body[key];
            const bodyKeys = Object.keys(body);
            const mangaKeys = Object.keys(MangaObj);

            if (JSON.stringify(bodyKeys) != JSON.stringify(mangaKeys)) {
                const diff = mangaKeys.filter((word) => {
                    return bodyKeys.indexOf(word) == -1;
                });
                logger.error(
                    `POST MANGA - BAD REQUEST - MISSING FIELDS: ${diff.join(", ")} - /mangas`
                );
                res.status(400).json({ missing: diff.join(", ") });
            } else {
                const response = await MangaService.saveManga(body);
                res.json(response);
            }
        } catch (error) {
            res.status(500).json({ message: `Internal Error`, error });
        }
    }

    public static async deleteOneManga(req: Request, res: Response) {
        const id = req.params.id!;
        try {
            const response = await MangaService.deleteManga(id);
            if (response.deletedCount == 0) {
                logger.info(`DELETE REQUEST - NOT FOUND - /mangas/${id}`);
                res.status(404).json({ message: "Id not found" });
            } else {
                res.json({ message: `${id} deleted sucessfully` });
            }
        } catch (error) {
            if (error.name == "CastError") {
                logger.error(`DELETE REQUEST - BAD REQUEST - INVALID ID - /mangas/${id}`);
                res.status(400).json({ message: `${id} is invalid.` });
            } else {
                res.status(500).json({ message: "Internal Error", error });
            }
        }
    }

    public static async updateManga(req: Request, res: Response) {
        const id = req.params.id!;
        try {
            const body = req.body;
            for (const key in body) if (!body[key]) delete body[key];
            let response = await MangaService.updateManga(id, body);
            if (response == null) {
                logger.info(`PATCH REQUEST - NOT FOUND - /mangas/${id}`);
                res.status(404).json({ message: `${id} not found.` });
            } else {
                res.json(response);
            }
        } catch (error) {
            if (error.name == "CastError") {
                logger.error(`DELETE REQUEST - BAD REQUEST - INVALID ID - /mangas/${id}`);
                res.status(400).json({ message: `${id} is invalid.` });
            } else {
                res.status(500).json({ message: "Internal Error", error });
            }
        }
    }
}
