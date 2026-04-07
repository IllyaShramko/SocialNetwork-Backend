import { join } from "node:path";

export const uploadDir = join(__dirname, "../", "../", "./media");
export const thumbnaiDir = join(uploadDir, "./thumbnail");
export const originDir = join(uploadDir, "./originDir");
