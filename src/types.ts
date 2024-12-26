
// Interface representing a book
export interface Book {
  isbn: string;
  title: string;
  author: string;
  publicationYear: number;
  isAvailable: boolean;
}
// Custom error class for book not found

export class BookNotFoundError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} not found`);
    this.name = 'BookNotFoundError';
  }
}

// Custom error class for book not available
export class BookNotAvailableError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} is not available`);
    this.name = 'BookNotAvailableError';
  }
}
// Custom error class for duplicate book
export class DuplicateBookError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} already exists`);
    this.name = 'DuplicateBookError';
  }
}