const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    let users_with_same_name = users.filter((user) => {
        return user.username === username;
    });

    if(users_with_same_name.length > 0) {
        //username is valid
        return true;
    } else {
        //username is invalid
        return false;
    }
}

const authenticatedUser = (username, password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    let valid_users = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if(valid_users.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    //save the user credentials for the session as a JWT
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        //username or password missing
        return res.status(404).json({message: "Error logging in"});
    }
    if(authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
            accessToken, username
        };
        return res.status(200).send("User successfully logged in");
    } else {
        //user not authenticated
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //post review with the username (stored in the session) posted
    const username = req.session.authorization['username'];
    const isbn = req.params.isbn;
    //accept a review as a request query
    const book = books[isbn];

    if(book) { //Check if book exists
        //book found
        const reviews = book['reviews'];
        const review = req.body.review;
    
        //if the review has been changed, update the review
        if(review) {
            //If the same user posts a different review on the same ISBN, it should modify the existing review
            //If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN
            reviews[username] = review;
        }
    
        book['reviews'] = reviews;
        books[isbn] = book;
        res.send(`The review for the book with ISBN ${isbn} has been added/updated.`);            
    } else {
        //book not found
        res.send("Unable to find book!");
    }
});

//delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if(book) {
        //book found
        const reviews = book['reviews'];
        const session_username = req.session.authorization['username'];
        const reviews_by_other_users = get_reviews_by_other_users(reviews, session_username);
        book['reviews'] = reviews_by_other_users;
        books[isbn] = book;
        res.send(`Reviews for the ISBN ${isbn} posted by the user ${session_username} deleted.`);    
    } else {
        //book not found
        res.send('Unable to find book!');
    }
});

//Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users’.
function get_reviews_by_other_users(reviews, session_username) {
    const usernames = Object.keys(reviews);

    const other_usernames = usernames.filter((username) => {
        const is_other_username = username != session_username;
        return is_other_username;
    });
   
    const initialValue = {};

    const reviews_by_other_users = other_usernames.reduce((current, username) => {
        //accumulate other usernames into new object
        const review = reviews[username];
        const sources = { [username] : review };
        const accumulation = Object.assign(current, sources);
        return accumulation;
    }, initialValue);

    return reviews_by_other_users;
}

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
