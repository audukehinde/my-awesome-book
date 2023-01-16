let books = JSON.parse(localStorage.getItem("books")) ?? [];

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const form = document.querySelector("form");

const booksEl = document.getElementById("books");

// const books = [];

function addBook(book) {
  const bookDiv = document.createElement("div");
  const bookele = document.createElement("div");
  bookele.innerHTML = `${book.Ntitle} By ${book.Nauthor}`;
  const remove = document.createElement("button");
  remove.innerText = "Remove";
  remove.classList = "btn-remove";

  remove.onclick = () => {
    removeBook(remove);
  };

  bookDiv.append(bookele, remove);
  booksEl.insertAdjacentElement("afterbegin", bookDiv);
}

// ????????
[...books].reverse().forEach(addBook);
// ??????
// const removeBtn = document.querySelectorAll(".btn-remove");
// console.log(removeBtn);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const Ntitle = title.value;
  const Nauthor = author.value;

  const book = { Ntitle, Nauthor };

  books.unshift(book);

  console.log(books);
  addBook(book);
  localStorage.setItem("books", JSON.stringify(books));
});

// removeBtn.forEach(function (e) {
//   console.log(e);
//   e.addEventListener("click", (e) => {
//     const index = Array.from(booksEl.children).indexOf(e.parentNode);
//     console.log("Clicked");
//   });
// });

const removeBook = (e) => {
  const index = Array.from(booksEl.children).indexOf(e.parentNode);
  e.parentNode.remove();
  books = books.filter((_, i) => index !== i);
  localStorage.setItem("books", JSON.stringify(books));
};

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    console.log(`Dear ${owner}, Thanks for opening an account with us `);
  }

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.movements.push(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log("Loan Approved!");
    }
  }
}

const acc1 = new Account("Kenny", "Naira", 1492);
acc1.deposit(400);
acc1.deposit(700);
acc1.withdraw(-250);
acc1.withdraw(-750);
acc1.requestLoan(2000);
console.log(acc1);
