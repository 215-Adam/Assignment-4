const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Books API', () => {

    // GET all books
    test('GET /api/books returns all books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3); // adjust if initial books change
    });

    // GET book by ID
    test('GET /api/books/:id returns a book', async () => {
        const response = await request(app).get('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('GET /api/books/:id returns 404 for non-existent book', async () => {
        const response = await request(app).get('/api/books/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    // POST a new book
    test('POST /api/books creates a new book', async () => {
        const newBook = {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            genre: "Fantasy",
            copiesAvailable: 4
        };
        const response = await request(app).post('/api/books').send(newBook);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('The Hobbit');
    });

    // PUT update a book
    test('PUT /api/books/:id updates an existing book', async () => {
        const updatedBook = {
            title: "1984 Updated",
            author: "George Orwell",
            genre: "Dystopian",
            copiesAvailable: 10
        };
        const response = await request(app).put('/api/books/3').send(updatedBook);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('1984 Updated');
        expect(response.body.copiesAvailable).toBe(10);
    });

    test('PUT /api/books/:id returns 404 for non-existent book', async () => {
        const response = await request(app).put('/api/books/999').send({ title: "No Book" });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    // DELETE a book
    test('DELETE /api/books/:id deletes a book', async () => {
        const response = await request(app).delete('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    test('DELETE /api/books/:id returns 404 for non-existent book', async () => {
        const response = await request(app).delete('/api/books/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
