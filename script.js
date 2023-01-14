const myLibrary = [];

function Book(title, author, pages, isRead = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    myLibrary.push(this);
}


// Pour ne pas qu'une nouvelle instance de la fonction soit créée à chaque nouvel objet, on la définit dans le prototype :
Book.prototype.getInfo = function() 
{
    return this.isRead ? 
    `${this.title} is a book of ${this.author} and you have read all of its ${this.pages} pages.` : 
    `"${this.title}" is a book of ${this.author} and you have not read all of its ${this.pages} pages yet.`;
}

Book.prototype.toggleRead = function() {
    this.isRead = (!this.isRead);
} 

const dune = new Book('Dune', 'Frank Herbert', 894);
const hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 368);
const bigBrother = new Book ('1984', 'George Orwell', 396);
const lostTime = new Book ('In Search of Lost Time', 'Marcel Proust', 468);
const warAndPeace = new Book ('War and Peace', 'Leon Tolstoï', 1296);


// console.log(book);
// console.log(book.getInfo());

// console.log('Reading the book...');
// book.toggleRead();
// console.log(book);
// console.log(book.getInfo());
console.log(myLibrary);