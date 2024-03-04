import express from "express";
import cors from "cors";
import { logger } from "logger-express";
import swagger from"./config/swagger/swagger.js";

import travelsRouter from "./config/routes/travelRoutes.js";
import loginRoutes from "./config/routes/loginRoutes.js";
import userRoutes from "./config/routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

swagger(app)
app.use(express.json());
app.options('*', cors())
app.use(logger());
app.get("/", (req, res) => {
  res.status(200).json({message: "bienvenido a la api de viajes"});
});
app.use("/api/v1", userRoutes);
app.use("/api/v1", travelsRouter);
app.use("/api/v1", loginRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api/v1/docs`);
  console.log(`Swagger production documents available at https://swagger-tutorial.onrender.com/api/v1/docs`);
});

export default app;
