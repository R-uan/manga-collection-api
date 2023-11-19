export class Info {
    title: string;
    author: string;
    type: string;
    year: number;
    status: string;
    genre: string[];
    synopse: string;

    constructor(
        title: string,
        author: string,
        type: string,
        year: number,
        status: string,
        genre: string[],
        synopse: string
    ) {
        this.title = title;
        this.author = author;
        this.type = type;
        this.year = year;
        this.status = status;
        this.genre = genre;
        this.synopse = synopse;
    }
}
