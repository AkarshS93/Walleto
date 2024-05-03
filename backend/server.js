import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import records from "./routes/record.js";
import signupRoutes from './routes/signupRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import connectDb from "./db/connection.js";
import { verifyToken } from "./middleware/jwt.js";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

connectDb()

//app.use("/api", records);
app.use("/api", signupRoutes)
app.use("/api", loginRoutes);
app.use("/api", records)
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});