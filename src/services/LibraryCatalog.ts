import { Book } from '../models/Book';
import { BookNotFoundError, BookNotAvailableError, DuplicateBookError } from '../utils/errors';

export class LibraryCatalog {
  private books: Map<string, Book> = new Map();

  addBook(bookDetails: Omit<Book, 'isAvailable'>): void {
    if (this.books.has(bookDetails.isbn)) {
      throw new DuplicateBookError(bookDetails.isbn);
    }

    this.books.set(bookDetails.isbn, {
      ...bookDetails,
      isAvailable: true
    });
  }

  checkoutBook(isbn: string): void {
    const book = this.books.get(isbn);
    
    if (!book) {
      throw new BookNotFoundError(isbn);
    }

    if (!book.isAvailable) {
      throw new BookNotAvailableError(isbn);
    }

    book.isAvailable = false;
    this.books.set(isbn, book);
  }

  returnBook(isbn: string): void {
    const book = this.books.get(isbn);
    
    if (!book) {
      throw new BookNotFoundError(isbn);
    }

    book.isAvailable = true;
    this.books.set(isbn, book);
  }

  getAvailableBooks(): Book[] {
    return Array.from(this.books.values())
      .filter(book => book.isAvailable)
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}