import express from "express";
import createNumer from "../controllers/numerController.js";
import messageLimiter from "../middlewares/rateLimit.js";
import validateNumer from "../middlewares/validate.js";
const router = express.Router();

router.post("/", messageLimiter, validateNumer, createNumer);

export default router;
