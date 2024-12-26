import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCatalog } from './LibraryCatalog';
import { BookNotFoundError, BookNotAvailableError, DuplicateBookError } from '../utils/errors';

describe('LibraryCatalog', () => {
  let catalog: LibraryCatalog;

  beforeEach(() => {
    catalog = new LibraryCatalog();
  });

  // Step 1: Test adding books
  describe('addBook', () => {
    it('should add a book successfully', () => {
      const newBook = {
        isbn: '123-456',
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(newBook);
      const books = catalog.getAvailableBooks();
      
      expect(books).toHaveLength(1);
      expect(books[0]).toEqual({ ...newBook, isAvailable: true });
    });

    it('should reject duplicate books', () => {
      const book = {
        isbn: '123-456',
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book);
      expect(() => catalog.addBook(book)).toThrow(DuplicateBookError);
    });
  });

  // Step 2: Test book checkout
  describe('checkoutBook', () => {
    it('should allow checkout of available book', () => {
      const book = {
        isbn: '123-456',
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book);
      catalog.checkoutBook(book.isbn);
      
      expect(catalog.getAvailableBooks()).toHaveLength(0);
    });

    it('should prevent checkout of non-existent book', () => {
      expect(() => catalog.checkoutBook('invalid-isbn'))
        .toThrow(BookNotFoundError);
    });

    it('should prevent checkout of already borrowed book', () => {
      const book = {
        isbn: '123-456',
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book);
      catalog.checkoutBook(book.isbn);
      
      expect(() => catalog.checkoutBook(book.isbn))
        .toThrow(BookNotAvailableError);
    });
  });

  // Step 3: Test book return
  describe('returnBook', () => {
    it('should allow return of borrowed book', () => {
      const book = {
        isbn: '123-456',
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book);
      catalog.checkoutBook(book.isbn);
      catalog.returnBook(book.isbn);
      
      expect(catalog.getAvailableBooks()).toHaveLength(1);
    });

    it('should reject return of non-existent book', () => {
      expect(() => catalog.returnBook('invalid-isbn'))
        .toThrow(BookNotFoundError);
    });
  });

  // Step 4: Test book listing
  describe('getAvailableBooks', () => {
    it('should list only available books', () => {
      const book1 = {
        isbn: '123-456',
        title: 'Test Book 1',
        author: 'Test Author',
        publicationYear: 2023
      };

      const book2 = {
        isbn: '789-012',
        title: 'Test Book 2',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book1);
      catalog.addBook(book2);
      catalog.checkoutBook(book1.isbn);

      const availableBooks = catalog.getAvailableBooks();
      expect(availableBooks).toHaveLength(1);
      expect(availableBooks[0].isbn).toBe(book2.isbn);
    });

    it('should sort books by title', () => {
      const book1 = {
        isbn: '123-456',
        title: 'B Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      const book2 = {
        isbn: '789-012',
        title: 'A Test Book',
        author: 'Test Author',
        publicationYear: 2023
      };

      catalog.addBook(book1);
      catalog.addBook(book2);

      const books = catalog.getAvailableBooks();
      expect(books[0].title).toBe('A Test Book');
      expect(books[1].title).toBe('B Test Book');
    });
  });
});