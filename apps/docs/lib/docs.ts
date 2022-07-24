import fs from "node:fs";
import { join } from "path";
import matter from "gray-matter";

const filesDir = join(process.cwd(), "documentation");
const examplesDir = join(process.cwd(), "examples");

export function getDocBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(filesDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  return { slug: realSlug, content, meta: data };
}

export function getAllDocs() {
  const slugs = fs.readdirSync(filesDir);
  const docs = slugs.map((slug) => getDocBySlug(slug));
  return docs;
}

export function getAllDocLinks() {
  const slugs = fs.readdirSync(filesDir);
  return slugs.map((slug) => slug.replace(/\.md$/, ""));
}

export function getExampleBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(examplesDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  return { slug: realSlug, meta: data, content };
}

export function getAllExamples() {
  const slugs = fs.readdirSync(examplesDir);
  const examples = slugs.map((slug) => getExampleBySlug(slug));
  return examples;
}

export function getAllExampleLinks() {
  const slugs = fs.readdirSync(examplesDir);
  return slugs.map((slug) => slug.replace(/\.md$/, ""));
}
