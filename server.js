// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample movie data not shown

// Start the server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Bookstore API server running at http://localhost:${port}`);
    });
}

// GET /api/books - Return all books
app.get('/api/books', (req, res) => {
    res.json(books);
});
// GET /api/books/:id - Return a specific book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Convert ID from string to number
    const book = books.find(b => b.id === bookId); // Find the book with this ID

    if (book) {
        res.json(book); // Return the book if found
    } else {
        res.status(404).json({ error: 'Book not found' }); // 404 if not found
    }
});
// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    // Extract data from request body
    const { title, author, genre, copiesAvailable } = req.body;

    // Create new book with generated ID
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1, // generate next ID
        title,
        author,
        genre,
        copiesAvailable
    };

    // Add to books array
    books.push(newBook);

    // Return the created book with 201 status
    res.status(201).json(newBook);
});
// PUT /api/books/:id - Update an existing book
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, genre, copiesAvailable } = req.body;

    // Find the book to update
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    // Update the book
    books[bookIndex] = {
        id: bookId,
        title,
        author,
        genre,
        copiesAvailable
    };

    // Return the updated book
    res.json(books[bookIndex]);
});
// DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    // Find the book to delete
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    // Remove the book from the array
    const deletedBook = books.splice(bookIndex, 1)[0];

    // Return the deleted book
    res.json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
});

// Only start server when running directly, not when testing
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Bookstore API server running at http://localhost:${port}`);
    });
}

module.exports = app;




/* Create your REST API here with the following endpoints:
    'GET /api/books': 'Get all books',
    'GET /api/books/:id': 'Get a specific book',
    'POST /api/books': 'Add a new book',
    'PUT /api/books/:id': 'Update a book',
    'DELETE /api/books/:id': 'Delete a book'
*/











