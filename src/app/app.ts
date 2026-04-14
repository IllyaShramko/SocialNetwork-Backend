import express from "express";
import { router } from "./routes";
import { env } from "../config/env";
import { errorMiddleware } from "@middlewares/error.middleware";
import { logMiddleware } from "@middlewares/log.middleware";
import cors from "cors";
import { originalDir, thumbnailDir } from "@config/path";

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "",
	}),
);
app.use("/images/", express.static(thumbnailDir));
app.use("/images_signs/", express.static(originalDir));

app.use(logMiddleware);
app.use("/", router);
app.use(errorMiddleware);
app.listen(env.PORT, env.HOST, () => {
	console.log(`Server started on http://${env.HOST}:${env.PORT}`);
});
