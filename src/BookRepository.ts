import book from "./book";

export default abstract class BookRepository {
    public static findByTitle(title: string) {
        return book.find({ title: new RegExp(`${title}`, "i") });
    }

    public static findByAuthor(author: string) {
        return book.find({ author: new RegExp(`${author}`, "i") });
    }
}
