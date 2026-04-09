import express from "express";
import { router } from "./routes"
import { env } from "../config/env";
import { errorMiddleware } from "@middlewares/error.middleware";
import { logMiddleware } from "@middlewares/log.middleware";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.use("/", router);
app.use(logMiddleware);
app.use(errorMiddleware);
app.listen(env.PORT, env.HOST, () => {
    console.log(`Server started on http://${env.HOST}:${env.PORT}`)
});