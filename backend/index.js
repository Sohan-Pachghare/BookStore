if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bookRoutes = require("./routes/bookRouter");
const cors = require("cors");

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main()
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("on root route.");
});

app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
