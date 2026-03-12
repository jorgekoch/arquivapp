import express from "express";
import cors from "cors";
import router from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.arquivapp.com.br",
      "https://arquivapp.com.br",
    ],
    credentials: true,
  })
);

app.use("/billing/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.use(router);

app.use(errorMiddleware);

export default app;