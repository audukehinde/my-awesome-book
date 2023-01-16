class AwesomeBook {
  /** @type {Book[]} */
  #bookCollection;

  constructor() {
    this.#bookCollection = JSON.parse(localStorage.getItem("books")) ?? [];
    this.#bookCollection.forEach((e) => this.#insertBookToDOM(e, "beforeend"));
  }

  insert = (book) => {
    this.#bookCollection.unshift(book); // add new book on first index of the books array
    this.#insertBookToDOM(book);
    this.#save();
  };

  /**
   * Save bookCollection array into localStorage
   * */
  #save = () => {
    localStorage.setItem("books", JSON.stringify(this.#bookCollection));
  };

  #insertBookToDOM = (book, where = "afterbegin") => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-container";

    const bookTitle = document.createElement("div");
    bookTitle.innerHTML = `${book.title} by ${book.author}`;

    const btn = document.createElement("button");
    btn.innerText = "Remove";
    btn.onclick = () => this.#remove(btn);

    bookDiv.append(bookTitle, btn);

    document.getElementById("books").insertAdjacentElement(where, bookDiv);
  };

  /**
   * Remove parentNode - div.book-container from DOM and also remove from the bookCollection
   *
   * @param {Node} btn - Remove button node
   * */
  #remove = (btn) => {
    const root = btn.parentNode;
    const index = Array.from(root.parentNode.children).indexOf(root);
    root.parentNode.removeChild(root); // remove book element from #books Node

    this.#bookCollection.splice(index, 1); // remove book object from array
    this.#save();
  };
}

const form = document.querySelector("form");
const awesomeBook = new AwesomeBook();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const [titleInput, authorInput] = e.target.elements;
  awesomeBook.insert({
    author: authorInput.value,
    title: titleInput.value,
  });
  e.target.reset();
});

// handle nav buttons
const navBtns = document.querySelectorAll(".nav-button");

navBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const text = e.currentTarget.innerText;
    document.body.className = `show-${text.toLowerCase().replace(" ", "-")}`;
  });
});

// Update time element every second
const options = {
  year: "numeric",
  month: "long",
  weekday: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const timeEl = document.querySelector("time");

setInterval(() => {
  timeEl.innerText = new Date().toLocaleDateString("en-US", options);
}, 1000);
