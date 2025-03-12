import express from "express";
import { Check, login, logout, signup } from "../controllers/auth.control.js";
import {Protected} from '../middleware/protected.js'
import { Compile } from "../lib/compiler.js";
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/compile",Compile)
router.get("/check",Protected,Check);
export default router;