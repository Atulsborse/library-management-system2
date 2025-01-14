import { Book, BookNotFoundError, BookNotAvailableError, DuplicateBookError } from './types';
//Implement Book method in LibraryCatalog
export class Library {
  private books: Map<string, Book> = new Map();
  //"Implement add book feature"
  addBook(book: Omit<Book, 'isAvailable'>): void {
    if (this.books.has(book.isbn)) {
      throw new DuplicateBookError(book.isbn);
    }

    this.books.set(book.isbn, {
      ...book,
      isAvailable: true
    });
  }
  //borrow book test ceses paased
  borrowBook(isbn: string): void {
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
///Implement returnBook method in LibraryCatalog
  returnBook(isbn: string): void {
    const book = this.books.get(isbn);
    
    if (!book) {
      throw new BookNotFoundError(isbn);
    }

    book.isAvailable = true;
    this.books.set(isbn, book);
  }
  //getAvailbleBooks book test ceses paased
  getAvailableBooks(): Book[] {
    return Array.from(this.books.values())
      .filter(book => book.isAvailable)
      .sort((a, b) => a.title.localeCompare(b.title));
  }
  //getallbooks book test ceses paased
  getAllBooks(): Book[] {
    return Array.from(this.books.values())
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}