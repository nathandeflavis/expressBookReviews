const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const RateLimit = require('express-rate-limit');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Set up rate limiter: maximum of 100 requests per 15 minutes per IP
const authRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: "Too many requests, please try again later." }
});

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// Apply rate limiter to /customer/auth/* routes
app.use("/customer/auth/*", authRateLimiter);

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    if(req.session.authorization) {
        token = req.session.authorization['accessToken'];
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
         });
     } else {
         return res.status(403).json({message: "User not logged in"})
     }
});
 
const PORT =5500;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
