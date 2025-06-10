import { Router } from "express";
import {login, registerUser, logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);

export default router