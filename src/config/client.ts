import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "./env";

const adapter = new PrismaBetterSqlite3({
	url: env.DATABASE_URL,
});

export const PRISMA_CLIENT = new PrismaClient({
	adapter,
});
