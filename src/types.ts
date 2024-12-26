export interface Book {
  isbn: string;
  title: string;
  author: string;
  publicationYear: number;
  isAvailable: boolean;
}

export class BookNotFoundError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} not found`);
    this.name = 'BookNotFoundError';
  }
}

export class BookNotAvailableError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} is not available`);
    this.name = 'BookNotAvailableError';
  }
}

export class DuplicateBookError extends Error {
  constructor(isbn: string) {
    super(`Book with ISBN ${isbn} already exists`);
    this.name = 'DuplicateBookError';
  }
}