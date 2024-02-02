import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import router from "./routes/joyas.routes.js";

/*
3. Implementar middlewares para generar informes o reportes de alguna actividad o
evento específico que ocurra en cada una de las rutas.
(1 puntos)
*/
import { logger } from "logger-express";




const app = express();

app.use(router);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const loggerOption = {
  logToFile: true, // If you need to log information to a file
  colorize: true, // enable console colors
  infoColor: "magenta", // set a color for information messages
  errorColor: "red", // set a color for error messages:
};
app.use(logger(loggerOption));




app.listen(PORT, () => {
  console.log(`🟢 Servidor encendido http://localhost:${PORT} 🟢`);
});
