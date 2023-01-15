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
    console.log(this);
}

Book.prototype.getHTML = function(index) {
    const icon = this.isRead ? './book-check.svg' : './book-clock-outline.svg';
    const res = 
    `
    <div id="${index}" class="book-container">
        <p class="book-title">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages">${this.pages} pages</p>
        <div class="book-icons">
            <button class="book-read-toggle"><object data="${icon}" width="30" height="30"></object></button>
            <object data="./book-minus-outline.svg" width="30" height="30"></object>
        </div>
        <button class="delete">Delete</button>
    </div> 
    `;
    return res;
}

const dune = new Book('Dune', 'Frank Herbert', 894, true);
const hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 368, true);
const bigBrother = new Book ('1984', 'George Orwell', 396, true);
const lostTime = new Book ('In Search of Lost Time', 'Marcel Proust', 468);
const warAndPeace = new Book ('War and Peace', 'Leon Tolstoï', 1296);



// -------------------------------------------
// ------------- DOM -------------------------
// -------------------------------------------
const body = document.querySelector('.body');





const refreshLibrary = () => {
    body.innerHTML = '';
    myLibrary.forEach((el, index) => {
        const icon = el.isRead ? './book-check.svg' : './book-clock-outline.svg';
        body.insertAdjacentHTML('beforeend', el.getHTML(index));
    });


    // CHANGE READ STATUS OF A BOOK
    const books = document.querySelectorAll('.book-read-toggle');
    books.forEach(el => {
        console.log(el);
        el.addEventListener('click', () => {
            myLibrary[Number(el.getAttribute('id'))].toggleRead();
            refreshLibrary(); 
        });
    })

    // DELETE A BOOK
    const delBtns = document.querySelectorAll('.delete');
    delBtns.forEach(el => {
        el.addEventListener('click', function() {
        myLibrary.splice(Number(el.parentElement.getAttribute('id')), 1);
        refreshLibrary()  
        })
    })
}

refreshLibrary();

