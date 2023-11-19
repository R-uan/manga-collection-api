import { Router } from "express";
import MangaController from "../Component/MangaController";

const router = Router();

router.route("/mangas").get(MangaController.getAll).post(MangaController.saveOneManga);
router.route("/mangas/search-:option-:input").all(MangaController.findByTitleOrAuthor);
router
    .route("/mangas/:id")
    .delete(MangaController.deleteOneManga)
    .patch(MangaController.updateManga);

export { router };
