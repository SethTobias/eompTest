/*
Hello World

*/

//
import express from "express";

import { config } from "dotenv";
config();

import cors from "cors";

// 
// import exerciseRouter from "./Routes/exercise.js";

//
const app = express();
// 
app.use(express.json());
// 
app.use(cors());

//

//
// app.use("/form", exerciseRouter);

//
const PORT = process.env.PORT;
//
app.listen(PORT, () => {
  console.log(`This server is running at Port: http://localhost:${PORT}`);
  console.log(process.env.MYSQL_ADDON_PORT);
});
