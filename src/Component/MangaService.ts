import { Manga } from "src/Datatypes/Manga";
import MangaModel from "./MangaModel";

export default abstract class MangaService {
    public static getAll() {
        return MangaModel.find();
    }

    public static findByTitle(title: string) {
        return MangaModel.find({ title: new RegExp(`${title}`, "i") });
    }

    public static findByAuthor(author: string) {
        return MangaModel.find({ author: new RegExp(`${author}`, "i") });
    }

    public static saveManga(manga: Manga) {
        return MangaModel.create(manga);
    }

    public static deleteManga(id: string) {
        return MangaModel.deleteOne({ _id: id });
    }

    public static updateManga(id: string, data: any) {
        return MangaModel.findOneAndUpdate({ _id: id }, data, { new: true });
    }
}
