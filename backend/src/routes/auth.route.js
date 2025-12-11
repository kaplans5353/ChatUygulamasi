import express from "express";
import {signup} from "../controllers/auth.controller.js";

const router = express.Router();

    router.get("/signup",signup);

    router.get("/login", (req, res) => {
    res.send("login endpoind1");
    });
    router.get("/logout", (req, res) => {
    res.send("logout endpoind2");
    });
   

export default router;