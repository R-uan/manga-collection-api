import supertest from "supertest";
import createServer from "../Util/server";
import { Manga1, Manga1Update, Manga2 } from "./manga.test.data";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createServer();

describe("Manga Requests", () => {
    let idForDeletion = "";
    let idForUpdate = "";

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("Create Manga in the database", () => {
        it("Should successfuly create a document", async () => {
            const { statusCode, body } = await supertest(app).post("/mangas").send(Manga1);
            expect(typeof body).toBe("object");
            expect(statusCode).toBe(200);
            idForUpdate = body._id;
        });

        it("Should successfuly create a document", async () => {
            const { statusCode, body } = await supertest(app).post("/mangas").send(Manga2);
            expect(typeof body).toBe("object");
            expect(statusCode).toBe(200);
            idForDeletion = body._id;
        });
    });

    describe("Get Non-existing Manga By Title", () => {
        const MangaTitle = "does-not-exist";
        it("Should return a 404", async () => {
            await supertest(app).get(`/mangas/search-title-${MangaTitle}`).expect(404);
        });
    });

    describe("Get Request By Title", () => {
        it("Should successfuly return a manga by the title", async () => {
            const MangaTitle = "Haiena";
            await supertest(app).get(`/mangas/search-title-${MangaTitle}`).expect(200);
        });
    });

    describe("Get Request By Author", () => {
        it("Should successfuly return a manga by the author", async () => {
            const MangaAuthor = "Zyugoya";
            await supertest(app).get(`/mangas/search-author-${MangaAuthor}`).expect(200);
        });
    });

    describe("Get All Request", () => {
        it("Should verify if the array lenght == 2", async () => {
            const { statusCode, body } = await supertest(app).get(`/mangas`);
            expect(statusCode).toBe(200);
            expect(body.length).toBe(2);
        });
    });

    describe("Delete Request", () => {
        it("Should delete Manga2", async () => {
            const { statusCode, body } = await supertest(app).delete(`/mangas/${idForDeletion}`);
            expect(statusCode).toBe(200);
        });

        describe("Delete Request Verification", () => {
            it("Should have one less document in the response array", async () => {
                const { statusCode, body } = await supertest(app).get(`/mangas`);
                expect(statusCode).toBe(200);
                expect(body.length).toBe(1);
            });
        });
    });

    describe("Update Request", () => {
        it("Should Update Manga1", async () => {
            const { statusCode, body } = await supertest(app)
                .patch(`/mangas/${idForUpdate}`)
                .send(Manga1Update);
            expect(statusCode).toBe(200);
        });

        describe("Update Request Verification", () => {
            it("Should search the document by it's new name", async () => {
                const MangaTitle = "patch";
                await supertest(app).get(`/mangas/search-title-${MangaTitle}`).expect(200);
            });
        });
    });
});
