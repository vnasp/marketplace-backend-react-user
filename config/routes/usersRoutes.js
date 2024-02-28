import express from 'express';
import { auth } from "../src/middlewares/auth.js";
import {usersController} from '../src/controllers/usersController.js';

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users', auth.checkAuthentication, usersController.getUser);

export default router;
