import { writeFileSync, mkdirSync } from "node:fs";
import { documents } from "../src/lib/documents.ts";
mkdirSync("data", { recursive: true });
writeFileSync("data/demo-documents.json", JSON.stringify(documents, null, 2));
console.log(`Exported ${documents.length} demo records.`);
