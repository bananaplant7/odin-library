const container = document.querySelector('.container');
const newBookBtn = document.querySelector('#newBookBtn');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#closeBtn');
const submitBtn = document.querySelector('#submitBtn');
const clearBtn = document.querySelector('#clearBtn');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#authorName');
const pages = document.querySelector('input[type=number]');
const read = document.querySelector('#read');
const notRead = document.querySelector('#notRead');
const form = document.querySelector('form');
let removeBtns = document.querySelectorAll('[data-indexNum]');
let readStatusBtns = document.querySelectorAll('[data-indexNumRead]');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

Book.prototype.toggleRead = function () {
    if (this.read == 'read') {
        this.read = 'not read';
    } else this.read = 'read';
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// for each book in myLibrary, creates card and appends book info on card
function displayBooks() {
    container.textContent = ''; // ** investigate this
    let counter = 0;
    myLibrary.forEach(book => {
        let card = document.createElement("div");
        container.appendChild(card);

        let title = document.createElement("p");
        title.textContent = book.title;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        card.appendChild(pages);

        let read = document.createElement("button");
        read.textContent = book.read;
        card.appendChild(read);
        read.setAttribute('data-indexNumRead', counter);

        let remove = document.createElement("button");
        remove.textContent = 'remove';
        card.appendChild(remove);
        remove.setAttribute('data-indexNum', counter);
        counter++;
    });
    removeBook();
    changeReadStatus();
}

function openModal() {
    if (modal == null) {
        return;
    } else {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function closeModal() {
    if (modal == null) {
        return;
    } else {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
}

newBookBtn.addEventListener('click', () => {
    openModal();
});

closeBtn.addEventListener('click', () => {
    closeModal();
});

overlay.addEventListener('click', () => {
    closeModal();
});

// returns true or false to if all form fields are filled 
function formAllValid() {
    if (title.value != '' && author.value != '' && pages.value != ''
        && (read.checked || notRead.checked)) {
        return true;
    } else return false;
}

// deselects all form fields
function clearAll() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
    notRead.checked = false;
}

// if all inputs are valid
// collect each piece of data 
// create new book
// add to library
// displayBooks()
// clear form & close modal
submitBtn.addEventListener('click', () => {
    if (formAllValid()) {
        let newBook = new Book(title.value, author.value, pages.value, (read.checked == true) ? "read" : "not read");
        addBookToLibrary(newBook);
        displayBooks();
        clearAll();
        closeModal();
    }
});

clearBtn.addEventListener('click', () => {
    clearAll();
});

// just to have some placeholder books
let Book1 = new Book("Book1", "Bob", 123, "read");
let Book2 = new Book("Book2", "Cob", 123, "not read");
let Book3 = new Book("Book3", "Dob", 123, "read");
addBookToLibrary(Book1);
addBookToLibrary(Book2);
addBookToLibrary(Book3);

displayBooks();


// select all remove buttons
// add event listener for all remove btns on click: 
// 1. find index number 
// 2. remove from myLibrary
// 3. update display
// this must run every time new book is added 
function removeBook() {
    removeBtns = document.querySelectorAll('[data-indexNum]');
    removeBtns.forEach(btn => btn.addEventListener('click', () => {
        indexNum = btn.getAttribute('data-indexNum');
        myLibrary.splice(indexNum, 1);
        displayBooks();
    }));
}

// indentical to ^ but instead of remove from myLibrary, changes read status
// using function from prototype
function changeReadStatus() {
    readStatusBtns = document.querySelectorAll('[data-indexNumRead]');
    readStatusBtns.forEach(btn => btn.addEventListener('click', () => {
        indexNum = btn.getAttribute('data-indexNumRead');
        myLibrary[indexNum].toggleRead();
        displayBooks();
    }));
}