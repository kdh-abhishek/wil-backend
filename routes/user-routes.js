import express from "express";
// Import the getAllUser function from the appropriate location
import { getAllUser, login, signup } from "../controllers/user-controller.js";

const router = express.Router();



router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

export default router;
