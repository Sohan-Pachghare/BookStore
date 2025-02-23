if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Book = require("./models/bookModel");

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main()
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("on root route.");
});

app.post("/book", async (req, res) => {
  try {
    //validation
    if (
      !req.body.book.name ||
      !req.body.book.author ||
      !req.body.book.publishYear
    ) {
      return res.status(404).send("Send all required fiels");
    }
    // storing book info
    const newBook = {
      name: req.body.book.name,
      author: req.body.book.author,
      publishYear: req.body.book.publishYear,
    };
    // creating book in DB
    const book = await Book.create(newBook);
    await newBook.save();
    return res.send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      count: books.length,
      books: books,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Sorry for inconvenience! some error occured at Server.");
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const book = await Book.findById(id);
    res.json({
      books: book,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Sorry for inconvenience! some error occured at Server.");
  }
});

app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
