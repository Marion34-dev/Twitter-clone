import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

import { allPeeps } from "./routes/allPeeps.route.js";
import { singlePeep } from "./routes/singlePeep.route.js";
import { addPeep } from "./routes/addPeep.route.js";

const port = process.env.PORT;
const host = process.env.HOST;
const app = express(); // creates a server

const main = async () => {  // connects to DB
  console.log(`Connecting to ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
  console.log(`Successfully connected to ${process.env.DB_URI}`);
};

main().catch((err) => console.log(err));  // error handling if connection unsuccessful

app.use(express.json());
app.use(cors());
app.use(`/`, allPeeps);
app.use(`/add`, addPeep);
app.use(`/peep`, singlePeep);

const server = app.listen(port, host, () => {       //returns a server
  const SERVERHOST = server.address().address;      // defines the URL
  const SERVERPORT = server.address().port;         // defines the port
  console.log(`Server is listening at http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
