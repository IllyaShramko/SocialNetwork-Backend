import { NextFunction, Request, Response } from "express";
import multer, { memoryStorage } from "multer";
import { BadRequestError } from "../errors";
import { join } from "node:path";
import sharp from "sharp";
import { originalDir, thumbnailDir } from "@config/path";

export const uploadMiddleware = multer({ storage: memoryStorage() });

export function processImageMiddleware(
	size: number,
	quality: number = 50,
	isOptional: boolean = false,
) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const file = req.file;
			if (!file) {
				if (isOptional) {
					next();
					return;
				}
				next(new BadRequestError("File was not loaded"));
				return;
			}
			const filename = Date.now() + ".jpeg";
			const originalFilePath = join(originalDir, filename);
			const thumbnailFilePath = join(thumbnailDir, filename);

			await sharp(file.buffer)
				.flatten({ background: { r: 255, g: 255, b: 255 } })
				.jpeg({ quality: 100 })
				.toFile(originalFilePath);

			await sharp(file.buffer)
				.resize({ width: size, height: size })
				.flatten({ background: { r: 255, g: 255, b: 255 } })
				.jpeg({ quality })
				.toFile(thumbnailFilePath);
				
			file.filename = filename;
			next();
		} catch (error) {
			next(error);
		}
	};
}
