let container = document.querySelector('.container');
let newBook = document.querySelector('#newBook');

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

let Book1 = new Book("Book1", "Bob", 123, "read");
let Book2 = new Book("Book2", "Cob", 123, "not read");
let Book3 = new Book("Book3", "Dob", 123, "read");


function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(Book1);
addBookToLibrary(Book2);
addBookToLibrary(Book3);

// for each book in myLibrary, creates card and appends book info on card
function displayBooks() {
    myLibrary.forEach(book => {
        let card = document.createElement("div");
        container.appendChild(card); // change container later

        let title = document.createElement("p");
        title.textContent = book.title;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = book.author;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        card.appendChild(pages);

        let read = document.createElement("p");
        read.textContent = book.read;
        card.appendChild(read);
    });
}

newBook.addEventListener('click', function() {
    
})
