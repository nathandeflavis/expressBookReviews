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

//use a session object with user-defined secret and ensure that the session is valid
//app.use(session({secret:"fingerpint"},resave=true,saveUninitialized=true));

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
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
