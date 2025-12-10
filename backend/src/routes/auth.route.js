import express from "express";

const router = express.Router();

    router.get("/signup", (req, res) => {
    res.send("signup endpoind");
    });
    router.get("/login", (req, res) => {
    res.send("login endpoind");
    });
    router.get("/logout", (req, res) => {
    res.send("logout endpoind");
    });
   

export default router;