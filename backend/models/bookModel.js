const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
