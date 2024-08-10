import express from "express";
import cors from "cors";
import "dotenv/config";
import appRouter from "./core/routes/index.js";
import { error, notFound } from "./core/middlewares/Error.js";
import { DB_CONNECT } from "./core/database.config.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");

async function ensureUploadsDirExists() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log("Uploads directory is ready.");
  } catch (err) {
    console.error("Error creating uploads directory:", err);
  }
}

ensureUploadsDirExists();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api", appRouter);

app.use(error);
app.use(notFound);

DB_CONNECT().then((_) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
