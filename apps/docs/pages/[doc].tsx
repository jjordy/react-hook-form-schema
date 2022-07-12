import Layout from "components/Layout";
import { getAllDocs, getDocBySlug } from "lib/docs";
import { markdownToHtml } from "lib/markdown";

export default function Docs({ html }) {
  return (
    <Layout>
      <div className="bg-white rounded max-w-none prose lg:prose-xl p-32">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
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
  const { markdown } = getDocBySlug(params.doc);
  const html = await markdownToHtml(markdown || "");
  return {
    props: {
      html,
    },
  };
}
