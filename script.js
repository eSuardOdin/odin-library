const myLibrary = [];

function Book(title, author, pages, isRead = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    myLibrary.push(this);
}


Book.prototype.getInfo = function() 
{
    return this.isRead ? 
    `${this.title} is a book of ${this.author} and you have read all of its ${this.pages} pages.` : 
    `"${this.title}" is a book of ${this.author} and you have not read all of its ${this.pages} pages yet.`;
}

Book.prototype.toggleRead = function() {
    this.isRead = (!this.isRead);
    // console.log(this);
}

Book.prototype.getHTML = function(index) {
    // const icon = this.isRead ? './book-check.svg' : './book-clock-outline.svg';
    const icon = this.isRead  ? './book-check.png' : './book-clock-outline.png';
    const title = this.isRead ? 'Book read' : 'Not read yet';
    const res = 
    `
    <div id="${index}" class="book-container">
        <p class="book-title">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages">${this.pages} pages</p>
        <div class="book-icons">          
            <img title="${title}" class="book-read-toggle" src="${icon}" alt="read-status"/>
            <img title="Delete book" class="delete" src="book-minus-outline.png" alt="delete-icon"/> 
        </div>
    </div> 
    `;
    return res;
}



const addBook = (title, author, pages, isRead) => {
    const book = new Book(title, author, pages, isRead);
    refreshLibrary();
}

const dune = new Book('Dune', 'Frank Herbert', 894, true);
const hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 368, true);
const bigBrother = new Book ('1984', 'George Orwell', 396, true);
const lostTime = new Book ('In Search of Lost Time', 'Marcel Proust', 468);
const warAndPeace = new Book ('War and Peace', 'Leon Tolstoï', 1296);



// -------------------------------------------
// ------------- DOM -------------------------
// -------------------------------------------
const bookshelf = document.querySelector('.bookshelf');
const showFormBtn = document.querySelector('.showFormBtn');
const form = document.querySelector('.form-add');
const submitBookBtn = document.querySelector('.submitBookBtn');

// ---------------------------
// Show the add book form
// ---------------------------
const toggleForm = () => {
    console.log('Hidding');
    form.classList.toggle('hidden');
    bookshelf.classList.toggle('blurred');
};

showFormBtn.addEventListener('click', () => {
    toggleForm();
})





// ---------------------------
// Add a book
// ---------------------------
submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In order to check form even if default prevented
    document.forms[0].reportValidity() // Well, magic number is bad practice but I'm working on a single form 
    
    const book = new Book(
        document.getElementsByName('book-title')[0].value,
        document.getElementsByName('book-author')[0].value,
        document.getElementsByName('book-pages')[0].value,
        document.getElementsByName('book-is-read')[0].value
    );
    console.log(book);
    refreshLibrary();
})

// ---------------------------
// Refresh the Library layout
// ---------------------------

const refreshLibrary = () => {
    bookshelf.innerHTML = '';
    myLibrary.forEach((el, index) => {
        const icon = el.isRead ? './book-check.svg' : './book-clock-outline.svg';
        bookshelf.insertAdjacentHTML('beforeend', el.getHTML(index));
    });

    // CHANGE READ STATUS OF A BOOK
    const books = document.querySelectorAll('.book-read-toggle');
    books.forEach(el => {
        // console.log(el);
        el.addEventListener('click', () => {
            const bookID = Number(el.parentElement.parentElement.getAttribute('id'));
            myLibrary[bookID].toggleRead();
            refreshLibrary(); 
        });
    })

    // DELETE A BOOK
    const delBtns = document.querySelectorAll('.delete');
    delBtns.forEach(el => {
        el.addEventListener('click', function() {
            // console.log(`${myLibrary[Number(el.parentElement.parentElement.getAttribute('id'))].title}`);
        myLibrary.splice(Number(el.parentElement.parentElement.getAttribute('id')), 1);
        refreshLibrary();  
        //     console.log(myLibrary);
        })
    })
}



refreshLibrary();
console.log(myLibrary);
addBook('Toto to the beach', 'Tutu', 143, false);