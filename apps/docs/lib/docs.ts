import fs from "node:fs";
import { join } from "path";

const filesDir = join(process.cwd(), "documentation");

export function getDocBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(filesDir, `${realSlug}.md`);
  const markdown = fs.readFileSync(fullPath, "utf-8");
  return { slug: realSlug, markdown };
}

export function getAllDocs() {
  const slugs = fs.readdirSync(filesDir);
  const docs = slugs.map((slug) => getDocBySlug(slug));
  return docs;
}
