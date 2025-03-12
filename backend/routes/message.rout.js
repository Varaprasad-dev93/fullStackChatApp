import express from 'express';
import { deleteMessade, messages, sendMessage, Users } from "../controllers/Users.js";
import { Protected } from "../middleware/protected.js";
const router=express.Router();
router.get('/users',Protected,Users);
router.get('/:id',Protected,messages)
router.post('/send/:id',Protected,sendMessage);
router.post('/delete',deleteMessade);
export default router;
