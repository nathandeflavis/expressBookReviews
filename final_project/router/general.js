const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    const replacer = null;
    const space = 3;
    //display the output neatly
    res.send(JSON.stringify(books,replacer,space));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    //Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //Obtain all the keys for the ‘books’ object.
  const author = req.params.author;
  const keys = Object.keys(books);
  const books_by_author = [];

  for(const key of keys) {
    //Iterate through the ‘books’ array
    const book = books[key];

    //check the author matches the one provided in the request parameters
    if(book["author"] == author) {
        books_by_author.push(book);
    }
  }

  res.send(books_by_author);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //Obtain all the keys for the ‘books’ object.
  const title = req.params.title;
  const keys = Object.keys(books);
  const books_by_title = [];

  for(const key of keys) {
    //Iterate through the ‘books’ array
    const book = books[key];

    //check the title matches the one provided in the request parameters
    if(book["title"] == title) {
        books_by_title.push(book);
    }
  }

  res.send(books_by_title);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
