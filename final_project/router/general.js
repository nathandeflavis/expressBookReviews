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
//use async-await with Axios
public_users.get('/', (req, res) => {
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
    const book = books[isbn];

    if(book) {
        //book found
        res.send(book);
    } else {
        //book not found
        res.send('Unable to find book!')
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const attribute_name = 'author';
  const books_by_author = get_books_with_attribute(books, attribute_name, author);
  res.send(books_by_author);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const attribute_name = 'title';
  const books_with_title = get_books_with_attribute(books, attribute_name, title);
  res.send(books_with_title);
});

//get books based on attribute
function get_books_with_attribute(books, attribute_name, attribute_value) {
  //Obtain all the keys for the ‘books’ object.
  const keys = Object.keys(books);
  const books_with_attribute = [];

  for(const key of keys) {
    //Iterate through the ‘books’ array
    const book = books[key];

    //check the attribute matches the one provided in the request parameters
    if(book[attribute_name] == attribute_value) {
        books_with_attribute.push(book);
    }
  }

  return books_with_attribute;
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //Get the book reviews based on ISBN provided in the request parameters.
  const isbn = req.params.isbn;
  const book = books[isbn];

  if(book) {
    //book found
    const reviews = book["reviews"];
    const num_reviews = reviews.length;
    const book_has_reviews = num_reviews > 0;
    var body;

    if(book_has_reviews) {
        body = reviews;
    } else {
        //book doesn't have reviews
        body = 'Unable to find reviews!';
    }

    res.send(body);
  }
  else {
    //book not found
    res.send('Unable to find book!');
  }
});

const axios = require('axios');
const base_url = 'https://nathandeflav-3000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/';

//get the list of books available in the shop using async-await with Axios
const test_get_books = async () => {
    try {
        const route = '/';
        const qualified_url = base_url + route;
        const response = await axios.get(qualified_url);
        console.log('Books:');
        console.log(response.data);
    } catch(err) {
        console.error(err);
    }
}

test_get_books();

//get the book details based on ISBN using async-await with Axios
const test_get_book_by_isbn = async (isbn) => {
    try {
        const route = `/isbn/${isbn}`;
        const qualified_url = base_url + route;
        const response = await axios.get(qualified_url);
        console.log(`Book with ISBN ${isbn}:`);
        console.log(response.data);
    } catch(err) {
        console.error(err);
    }
}

const isbn = 1;
test_get_book_by_isbn(1);

module.exports.general = public_users;