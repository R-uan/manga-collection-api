import MongoRepository from "./BookRepository";

export default abstract class BookController {
    public static async findByTitleOrAuthor(query: { option: string; input: string }) {
        let returnValue;
        let input = query.input.split("+").join(" ");

        if (query.option == "title") {
            returnValue = await MongoRepository.findByTitle(input);
        } else if (query.option == "author") {
            returnValue = await MongoRepository.findByAuthor(input);
        }
        return returnValue;
    }
}
