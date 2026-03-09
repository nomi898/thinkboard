import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import notesRouter from "./routes/noteRoutes.js";
import { connectDB } from "../config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5001; 

app.use(cors({
  origin: "http://localhost:5174"
}));
app.use(express.json());
app.use(ratelimiter);


app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on Port:" , PORT);
  });
})



