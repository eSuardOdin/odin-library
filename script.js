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

Book.prototype.getHTML = function(index) {
    const icon = this.isRead ? './book-check.svg' : './book-clock-outline.svg';
    const res = 
    `
    <div class="book-container">
        <p class="book-title">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages">${this.pages} pages</p>
        <div class="book-icons">
            <object class="book-read-toggle" id="${index}" data="${icon}" width="30" height="30"></object>
            <object data="./book-minus-outline.svg" width="30" height="30"></object>
        </div>
    </div> 
    `;
    return res;
}

const dune = new Book('Dune', 'Frank Herbert', 894, true);
const hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 368, true);
const bigBrother = new Book ('1984', 'George Orwell', 396, true);
const lostTime = new Book ('In Search of Lost Time', 'Marcel Proust', 468);
const warAndPeace = new Book ('War and Peace', 'Leon Tolstoï', 1296);


// console.log(book);
// console.log(book.getInfo());

// console.log('Reading the book...');
// book.toggleRead();
// console.log(book);
// console.log(book.getInfo());
console.log(myLibrary);

// -------------------------------------------
// ------------- DOM -------------------------
// -------------------------------------------
const body = document.querySelector('.body');







myLibrary.forEach((el, index) => {
    const icon = el.isRead ? './book-check.svg' : './book-clock-outline.svg';
    body.insertAdjacentHTML('beforeend', el.getHTML(index));
});

const icons = document.querySelectorAll('.book-read-toggle');
const books = document.querySelectorAll('.book-container');
icons.forEach((el) => {
    el.addEventListener('click', () => console.log('hello'));
})

books.forEach(el => {
    el.addEventListener('click', () => console.log('hello2'));
})

// <object data="./icons/calendar.svg" width="30" height="30"></object>