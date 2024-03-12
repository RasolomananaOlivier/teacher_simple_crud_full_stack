import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import professorRoutes from "./routes/professors";
import { connectDB } from "./database";

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/v1/professors", professorRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, async () => {
  await connectDB();

  console.log(`Server running at http://localhost:${port}`);
});
