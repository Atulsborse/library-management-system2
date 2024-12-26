import { LibraryCatalog } from './services/LibraryCatalog';

// Initialize library catalog
const libraryCatalog = new LibraryCatalog();

// Helper function to display library status
function displayLibraryStatus(statusMessage: string) {
  console.log(`\n=== ${statusMessage} ===`);
  const availableBooks = libraryCatalog.getAvailableBooks();
  console.log('Available Books:', availableBooks);
}

// Demonstrate library operations
console.log('📚 Library Management System Demo\n');

try {
  // Add books to catalog
  console.log('Adding books to catalog...');
  const classicBooks = [
    {
      isbn: 'ISBN-001',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publicationYear: 1813
    },
    {
      isbn: 'ISBN-002',
      title: '1984',
      author: 'George Orwell',
      publicationYear: 1949
    }
  ];

  classicBooks.forEach(book => libraryCatalog.addBookToCatalog(book));
  displayLibraryStatus('Initial Library Catalog');

  // Demonstrate book checkout
  const bookToCheckout = 'ISBN-001';
  console.log(`\nChecking out book (${bookToCheckout})...`);
  libraryCatalog.checkOutBook(bookToCheckout);
  displayLibraryStatus('After Book Checkout');

  // Demonstrate book return
  console.log(`\nReturning book (${bookToCheckout})...`);
  libraryCatalog.returnBook(bookToCheckout);
  displayLibraryStatus('After Book Return');

  // Demonstrate error handling
  console.log('\nAttempting to add duplicate book...');
  libraryCatalog.addBookToCatalog(classicBooks[0]);
} catch (error) {
  console.error('\n❌ Error:', (error as Error).message);
}