import express from "express";
import cors from "cors";
// import { logger } from 'logger-express';
import swagger from "./config/swagger/swagger.js";
import loginRoutes from "./config/routes/loginRoutes.js";
import usersRoutes from "./config/routes/usersRoutes.js";
import googleUserRoutes from "./config/routes/googleUsersRoutes.js";
import productsRoutes from "./config/routes/productsRoutes.js";
import ordersRoutes from "./config/routes/ordersRoutes.js";
import favoritesRoutes from "./config/routes/favoritesRoutes.js";
import { errorController } from "./src/api/v1/controllers/errorController.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

swagger(app);
app.use(express.json());
app.use(cors());
// app.use(logger());
app.get("/", (req, res) => {
    res.send("✅ API online baby!!!!!!");
});
app.use("/api/v1", loginRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", googleUserRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", favoritesRoutes);
app.use("*", errorController.error404);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
    console.log(`Swagger production docs available at https://marketplace-backend-react-user.onrender.com/api/v1/docs`);
});

export default app;
