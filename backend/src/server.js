import express from "express";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


dotenv.config();
const app = express();
app.use(express.json());
const __dirname = path.resolve();
const PORT =process.env.PORT || 3000;


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

connectDB();

app.listen(PORT, () => console.log("server running on port ", + PORT));