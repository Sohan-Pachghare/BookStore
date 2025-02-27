const express = require("express");
const Book = require("../models/bookModel");
const router = express.Router();

//creat route
router.post("/", async (req, res) => {
  try {
    // //validation
    // if (
    //   !req.body.book.name ||
    //   !req.body.book.author ||
    //   !req.body.book.publishYear
    // ) {
    //   return res.status(404).send("Send all required fiels");
    // }
    // storing book info
    console.log(req.body);
    const newBook = {
      name: req.body.data.name,
      author: req.body.data.author,
      publishYear: req.body.data.publishYear,
    };
    // creating book in DB
    const book = await Book.create(newBook);
    await book.save();
    return res.send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
//read
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send("Sorry for inconvenience! some error occured at Server.");
  }
});
// single book read
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

//update
router.put("/edit/:id", async (req, res) => {
  try {
    validation;
    if (
      !req.body.data.name ||
      !req.body.data.author ||
      !req.body.data.publishYear
    ) {
      return res.status(404).send("Send all required fiels");
    }
    const { id } = req.params;
    console.log(req.body);
    const result = await Book.findByIdAndUpdate(id, { ...req.body.data });
    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.send("Book info updated successfully\n" + result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("Sorry for inconvenience! some error occured at Server.");
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).send("invalid request");
  }
  return res.send("Book Deleted Successfully!");
});

module.exports = router;
