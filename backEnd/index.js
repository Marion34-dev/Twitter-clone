import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { Login } from './routes/login.route.js';
import { Register } from './routes/register.route.js';
import { allPeeps } from "./routes/allPeeps.route.js";
import { singlePeep } from "./routes/singlePeep.route.js";
import { addPeep } from "./routes/addPeep.route.js";
import { isAuthenticated } from './middlewares/auth.validation.js';
import { Logout } from './routes/logout.route.js';
import User from './models/user.model.js';
import session from 'express-session';

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
const app = express(); // creates a server

const main = async () => {  // connects to DB
  console.log(`Connecting to ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
  console.log(`Successfully connected to ${process.env.DB_URI}`);
};

main().catch((err) => console.log(err));  // error handling if connection unsuccessful

// Middleware
app.use(express.json());
app.use(cors());

// Configure the session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace with your secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication Routes
app.use('/login', Login);
app.use('/register', Register);

// Middleware to check if a user is logged in
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    // Check if a user is logged in
    User.findById(req.session.user.id, (err, user) => {
      if (user) {
        req.user = user; // Set the user object in the request for further use
      }
      next();
    });
  } else {
    next();
  }
});

// Routes
app.use(`/`, allPeeps);
app.use(`/add`, isAuthenticated, addPeep);
app.use(`/peep`, isAuthenticated, singlePeep);
app.use('/logout', Logout);

const server = app.listen(port, host, () => {       //returns a server
  const SERVERHOST = server.address().address;      // defines the URL
  const SERVERPORT = server.address().port;         // defines the port
  console.log(`Server is listening at http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
