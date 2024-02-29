import express from 'express';
import cors from 'cors';
import loginRoutes from './config/routes/loginRoutes.js';
import usersRoutes from './config/routes/usersRoutes.js';
import {errorController} from './src/api/v1/controllers/errorController.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", loginRoutes);
app.use("/api/v1", usersRoutes);
app.use("*", errorController.error404);

app.listen(PORT, console.log(`Server running on port ${PORT}...`));
