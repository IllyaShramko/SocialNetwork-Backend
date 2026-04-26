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
	isMany: boolean = false,
) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const files = isMany
				? (req.files as Express.Multer.File[])
				: req.file
					? [req.file]
					: [];

			if (files.length === 0) {
				if (isOptional) return next();
				return next(new BadRequestError("Files were not loaded"));
			}

			await Promise.all(
				files.map(async (file) => {
					const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
					const originalFilePath = join(originalDir, filename);
					const thumbnailFilePath = join(thumbnailDir, filename);

					const image = sharp(file.buffer);

					await Promise.all([
						image
							.clone()
							.flatten({ background: { r: 255, g: 255, b: 255 } })
							.jpeg({ quality: 100 })
							.toFile(originalFilePath),
						image
							.clone()
							.resize({ width: size, height: size, fit: "cover" })
							.flatten({ background: { r: 255, g: 255, b: 255 } })
							.jpeg({ quality })
							.toFile(thumbnailFilePath),
					]);
					console.log(filename);
					file.filename = filename;
				}),
			);

			next();
		} catch (error) {
			next(error);
		}
	};
}
