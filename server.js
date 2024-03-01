import express from 'express';
import cors from 'cors';
import { logger } from 'logger-express';
import swagger from './config/swagger/swagger.js';
import loginRoutes from './config/routes/loginRoutes.js';
import usersRoutes from './config/routes/usersRoutes.js';
import {errorController} from './src/api/v1/controllers/errorController.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

swagger(app)
app.use(express.json());
app.use(cors());
app.use(logger());
app.use("/", loginRoutes);
app.use("/", usersRoutes);
app.use("*", errorController.error404);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
});
