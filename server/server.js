dotenv.config();
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { clerkMiddleware } from "@clerk/express";
import { router } from "./routes/index.js";
import { connectDB } from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

await connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/v1", router);


app.listen(PORT, () => console.log(`server running on port ${PORT}... `));
