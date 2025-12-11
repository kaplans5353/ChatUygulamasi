import express from "express";
import {signup} from "../controllers/auth.controller.js";

const router = express.Router();

    router.post("/signup",signup);

    router.get("/login", (req, res) => {
    res.send("login endpoind1");
    });
    router.post("/logout", (req, res) => {
    res.send("logout endpoind2");
    });
   

export default router;