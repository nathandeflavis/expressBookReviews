const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //take the ‘username’ and ‘password’ provided in the body of the request for registration
  const username = req.body.username;

  if(!username) {
    //show other errors like eg. when username &/ password are not provided
    return res.status(404).json({message: "Unable to register user: username not provided."}); 
  }

  //username provided
  const password = req.body.password;

  if(!password) {
    return res.status(404).json({message: "Unable to register user: password not provided."}); 
  }

  //username and password provided
    if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        //If the username already exists, mention the same
        return res.status(404).json({message: "User already exists!"});
    }
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
  //Get the book reviews based on ISBN provided in the request parameters.
  const isbn = req.params.isbn;
  const book = books[isbn];

  if(!book) {
    //book not found
    const body = `No book with ISBN ${isbn}.`;
    res.send(body);
    return;
  }

  //book found
  const reviews = book["reviews"];
  const num_reviews = reviews.length;
  const book_has_reviews = num_reviews > 0;
  var body;

  if(book_has_reviews) {
    body = reviews;
  } else {
    //book doesn't have reviews
    body = `No reviews for book with ISBN ${isbn}.`;
  }

  res.send(body);
});

module.exports.general = public_users;
