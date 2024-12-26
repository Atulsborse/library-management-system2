# Library Management System

A TypeScript-based library management system that demonstrates clean code practices, SOLID principles, and Test-Driven Development (TDD).

## Features

- Add new books to the library catalog
- Check out available books
- Return borrowed books
- View all available books
- Automatic sorting of books by title
- Comprehensive error handling

## Technologies Used

- TypeScript
- Vitest (Testing Framework)
- Node.js

## Project Structure

```
src/
├── models/
│   └── Book.ts           # Book interface definition
├── services/
│   ├── LibraryCatalog.ts       # Main library management logic
│   └── LibraryCatalog.test.ts  # Test suite for library catalog
└── utils/
    └── errors.ts         # Custom error classes
```

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

## Testing

The project follows Test-Driven Development practices with comprehensive test coverage. Run tests using:

```bash
npm test
```

For test coverage report:
```bash
npm run test:coverage
```

## API Documentation

### LibraryCatalog Class

#### `addBook(bookDetails)`
Adds a new book to the library catalog.
- Throws `DuplicateBookError` if ISBN already exists

#### `checkoutBook(isbn)`
Checks out a book from the library.
- Throws `BookNotFoundError` if book doesn't exist
- Throws `BookNotAvailableError` if book is already checked out

#### `returnBook(isbn)`
Returns a borrowed book to the library.
- Throws `BookNotFoundError` if book doesn't exist

#### `getAvailableBooks()`
Returns a sorted list of all available books.

## Error Handling

The system includes custom error classes:
- `BookNotFoundError`
- `BookNotAvailableError`
- `DuplicateBookError`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.