import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-400 text-4xl" />
        </Link>
      </div>
      {/* show buttons */}
      <div className="flex justify-center items-center gap-x-4 mb-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 rounded-lg px-4 py-1"
          onClick={() => setShow("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 rounded-lg px-4 py-1"
          onClick={() => setShow("card")}
        >
          Card
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : show == "table" ? (
        <BooksTable book={book} />
      ) : (
        <BooksCard books={book} />
      )}
    </div>
  );
};

export default Home;
