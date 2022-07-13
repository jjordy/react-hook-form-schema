import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import prism from "remark-prism";

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(gfm)
    .use(prism)
    .process(markdown);
  return result.toString();
}
