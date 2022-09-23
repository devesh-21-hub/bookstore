import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Books.css";
const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:9000/books");
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="head">Dot Book Store</h1>
      <div className="books">
        {!books &&
          books.map((book) => {
            return (
              <div className="book">
                {book.cover && (
                  <img className="image" src={book.cover} alt={book.title} />
                )}
                <h2 className="title">{book.title}</h2>
                <p className="description"></p>
                <span>{book.price}</span>
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link
                    to={`/update/${book.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </div>
            );
          })}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
