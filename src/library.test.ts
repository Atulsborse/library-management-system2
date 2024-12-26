import { describe, it, expect, beforeEach } from 'vitest';
import { Library } from './library';
import { BookNotFoundError, BookNotAvailableError, DuplicateBookError } from './types';
//Add tests for checking out books from the library catalog
describe('Library', () => {
  let library: Library;

  beforeEach(() => {
    library = new Library();
  });
//Add test for adding books
  describe('addBook', () => {
    it('should add a new book successfully', () => {
      const book = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      library.addBook(book);
      const availableBooks = library.getAvailableBooks();
      
      expect(availableBooks).toHaveLength(1);
      expect(availableBooks[0]).toEqual({ ...book, isAvailable: true });
    });

    it('should throw error when adding duplicate book', () => {
      const book = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      library.addBook(book);
      
      expect(() => library.addBook(book)).toThrow(DuplicateBookError);
    });
  });

  describe('borrowBook', () => {
    it('should allow borrowing an available book', () => {
      const book = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      library.addBook(book);
      library.borrowBook(book.isbn);
      
      expect(library.getAvailableBooks()).toHaveLength(0);
    });

    it('should throw error when borrowing non-existent book', () => {
      expect(() => library.borrowBook('non-existent')).toThrow(BookNotFoundError);
    });

    it('should throw error when borrowing unavailable book', () => {
      const book = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      library.addBook(book);
      library.borrowBook(book.isbn);
      
      expect(() => library.borrowBook(book.isbn)).toThrow(BookNotAvailableError);
    });
  });

  describe('returnBook', () => {
    it('should allow returning a borrowed book', () => {
      const book = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      library.addBook(book);
      library.borrowBook(book.isbn);
      library.returnBook(book.isbn);
      
      expect(library.getAvailableBooks()).toHaveLength(1);
    });

    it('should throw error when returning non-existent book', () => {
      expect(() => library.returnBook('non-existent')).toThrow(BookNotFoundError);
    });
  });

  describe('getAvailableBooks', () => {
    it('should return only available books in alphabetical order', () => {
      const book1 = {
        isbn: '123-456',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationYear: 2008
      };

      const book2 = {
        isbn: '789-012',
        title: 'Agile Principles',
        author: 'Robert C. Martin',
        publicationYear: 2006
      };

      library.addBook(book1);
      library.addBook(book2);
      library.borrowBook(book1.isbn);

      const availableBooks = library.getAvailableBooks();
      
      expect(availableBooks).toHaveLength(1);
      expect(availableBooks[0].title).toBe('Agile Principles');
    });
  });
});