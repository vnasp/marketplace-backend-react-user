import express from 'express';
import { auth } from "../../middlewares/auth.js";
import {ordersController} from '../../src/api/v1/controllers/ordersController.js';

const router = express.Router();

router.post('/orders', auth.checkAuthentication, ordersController.createOrder);

router.get('/orders', auth.checkAuthentication, ordersController.getOrdersByAuthUser);

export default router;