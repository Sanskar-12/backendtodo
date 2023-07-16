import express from "express";
import {
  getUserById,
  login,
  logout,
  register,
} from "../Controllers/UserControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Nice working");
});

router.get("/me", isAuthenticated, getUserById);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

export default router;
