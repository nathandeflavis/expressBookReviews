# expressBookReviews
An online book review application (Final Project in [Developing Back-End Apps with Node.js and Express](https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express) course, part of [IBM Full Stack Software Developer Professional Certificate](https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer)).

# What does the project do?
## Scenario
The project is a server-side application that stores, retrieves and manages book ratings and reviews. It provides the following features and capabilities to allow users to:
- Retrieve a list of all books available in the bookshop.
- Search for specific books and retrieve their details based on the book’s ISBN code, author names and titles.
- Retrieve reviews/comments for specified books.
- Register as a new user of the application.
- Login to the application.
- Add a new review for a book (logged-in users only).
- Modify a book review (logged-in users can modify only their own reviews).
- Delete a book review (logged-in users can delete only their own reviews).
- (Multiple users) Access the application at the same time to view and manage different book reviews simultaneously.

I implemented the application as a RESTful web service with the Create/Read/Update/Delete (CRUD) capabilities listed above as HTTP methods in an Express server and tested them using Postman. I also implemented Session and JavaScript Object Notation (JSON) Web Token (JWT) authentication to allow only logged-in users to perform certain operations. Furthermore I used Async/Await functions with Axios to allow multiple users to interact with the application simultaneously and not have to wait for each other’s operations to complete.

# Why is the project useful?
It's an opportunity to put my Node.js and Express.js skills into practice.

# How can users can get started with the project?
You can run the application in [an IBM Skills Network lab environment](https://skills.network).

## Steps
1. Open a terminal window.
3. Clone this repository: `[ ! -d 'expressBookReviews' ] && git clone https://github.com/nathandeflavis/expressBookReviews.git`
4. Change to the directory **final_project**: `cd final_project/`
5. Run `npm install` to install the required modules.
6. Run `npm start` to start the server.
7. To stop the server, press Ctrl-C.

# Where can users can get help with the project?
Users can contact the project's maintainers and contributors for help.

# Who maintains and contributes to the project?
@nathandeflavis

README adapted from [GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
