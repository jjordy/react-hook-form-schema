import Layout from "components/Layout";
import {
  getAllDocLinks,
  getAllDocs,
  getAllExampleLinks,
  getDocBySlug,
} from "lib/docs";
import { markdownToHtml } from "lib/markdown";
import Head from "next/head";

export default function Docs({ html, guides, examples, meta }) {
  const title = `RHFS: Documentation : ${meta.title}`;
  return (
    <>
      <Layout
        guides={guides}
        examples={examples}
        title={`RHFS | Documentation | ${meta.title}`}
      >
        <div className="rounded-xl bg-slate-900/40">
          <div className="container mx-auto md:p-16">
            <div className="bg-white rounded max-w-none prose lg:prose-xl lg:p-32 p-4">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const docs = await getAllDocs();
  return {
    paths: docs.map((doc) => {
      return {
        params: {
          doc: doc.slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const guides = getAllDocLinks();
  const examples = getAllExampleLinks();
  const { content, meta } = getDocBySlug(params.doc);
  const html = await markdownToHtml(content || "");
  return {
    props: {
      html,
      meta,
      guides,
      examples,
    },
  };
}
