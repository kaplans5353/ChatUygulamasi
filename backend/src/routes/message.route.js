
import express from "express";



const router = express.Router();
    router.get("/send", (req, res) => {
    res.send("Message endpoind");
    });

export default router;