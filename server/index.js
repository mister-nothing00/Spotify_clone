//SERVER
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

//Config file env
dotenv.config();

//Config file img
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

//APP
const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://spotify-clone-xz46.onrender.com",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);


const port = process.env.PORT || 5000;

//IMPORT ROUTES

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

//Using route

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//listener
app.listen(port, () => {
  console.log(`Server in esecuzione`);
  connectDb();
});
