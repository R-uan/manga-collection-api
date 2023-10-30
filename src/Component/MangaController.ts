import { Manga } from "../Datatypes/_Manga";
import MangaRepository from "./MangaService";
import { Info } from "../Datatypes/Info";
import { Link } from "../Datatypes/Link";
import { Stats } from "../Datatypes/Stats";

export default abstract class MangaController {
    public static async findByTitleOrAuthor(query: { option: string; input: string }) {
        let returnValue;
        let input = query.input.split("+").join(" ");

        if (query.option == "title") {
            returnValue = await MangaRepository.findByTitle(input);
        } else if (query.option == "author") {
            returnValue = await MangaRepository.findByAuthor(input);
        }
        return returnValue;
    }

    public static async saveOneManga(body: Manga) {
        const info = new Info(body.title, body.author, body.type, body.year, body.status, body.genre, body.synopse);
        const link = new Link(body.cover, body.url);
        const stats = new Stats();

        return await MangaRepository.saveManga({ info, link, stats });
    }
}
