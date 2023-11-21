class Manga {
    title: string;
    author: string;
    type: string;
    year: number;
    status: string;
    genre: string[];
    synopse: string;
    cover: string;
    url: string;
}

const MangaObj = new Manga();
export { MangaObj, Manga };
