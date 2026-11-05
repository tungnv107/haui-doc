import { copyFile, mkdir } from "node:fs/promises";

const publicDirectory = new URL("../public/", import.meta.url);
await mkdir(publicDirectory, { recursive: true });
await copyFile(
  new URL("../node_modules/pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url),
  new URL("pdf.worker.min.mjs", publicDirectory),
);
