import { z } from "zod";
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

export const DocumentSchema = z
  .instanceof(File)
  .refine(file => ["text/csv"], { message: "Invalid document type" })
  .refine(file => file.size <= FILE_SIZE_LIMIT);
