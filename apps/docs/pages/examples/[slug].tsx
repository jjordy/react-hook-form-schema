import Layout from "components/Layout";
import { FormSchema } from "react-hook-form-schema";
import dynamic from "next/dynamic";
import { ComponentDictionary, controls } from "components/elements/Forms";
import {
  AdjustmentsIcon,
  DocumentReportIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";
import { Tab } from "@headlessui/react";
import { TabList, TabItem, TabPanel } from "components/elements/Tabs";
import {
  getAllDocLinks,
  getAllExampleLinks,
  getAllExamples,
  getExampleBySlug,
} from "lib/docs";
import { markdownToHtml } from "lib/markdown";

const JSONViewer = dynamic(() => import("react-json-view"), { ssr: false });

export default function ExampleBySlug({ html, meta, guides, examples }) {
  return (
    <Layout
      guides={guides}
      examples={examples}
      title={`RHFS | Examples | ${meta.title}`}
    >
      <div className="container mx-auto">
        <div className="rounded-xl bg-slate-900/40 md:p-32 space-y-6">
          <h2 className="text-4xl p-2 md:text-6xl md:my-4 text-white font-bold tracking-tight">
            {meta.title}
          </h2>
          <div className="border-b-2 border-slate-500/30" />
          <Tab.Group>
            <TabList>
              <TabItem>
                {({ selected }) => (
                  <div className="flex items-center w-full justify-center">
                    RHFS Output
                    <AdjustmentsIcon
                      className={`ml-2 w-5 h-5 ${
                        selected ? "text-indigo-500" : ""
                      }`}
                    />
                  </div>
                )}
              </TabItem>
              <TabItem>
                {({ selected }) => (
                  <div className="flex items-center w-full justify-center">
                    JSON Schema
                    <DocumentReportIcon
                      className={`ml-2 w-5 h-5 ${
                        selected ? "text-indigo-500" : ""
                      }`}
                    />
                  </div>
                )}
              </TabItem>
              <TabItem>
                {({ selected }) => (
                  <div className="flex items-center w-full justify-center">
                    UI Schema
                    <DocumentTextIcon
                      className={`ml-2 w-5 h-5 ${
                        selected ? "text-indigo-500" : ""
                      }`}
                    />
                  </div>
                )}
              </TabItem>
            </TabList>
            <Tab.Panels>
              <TabPanel>
                <div className="bg-slate-900/40 rounded p-4 md:p-16">
                  <FormSchema
                    debug
                    className=""
                    name="my-default-form"
                    schema={meta.schema}
                    uiSchema={{
                      ...meta.uiSchema,
                      controls,
                    }}
                    components={ComponentDictionary}
                    defaultValues={meta?.defaultValues || {}}
                    onSubmit={(c) => alert(JSON.stringify(c, null, 2))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="max-h-[500px] overflow-auto">
                  <JSONViewer
                    src={meta.schema}
                    theme="threezerotwofour"
                    name={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="max-h-[500px] overflow-auto">
                  <JSONViewer
                    src={meta.uiSchema}
                    theme="threezerotwofour"
                    displayDataTypes={false}
                    displayObjectSize={false}
                  />
                </div>
              </TabPanel>
            </Tab.Panels>
          </Tab.Group>
          <div
            className="bg-white rounded max-w-none prose lg:prose-xl lg:p-32 p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const examples = await getAllExamples();
  return {
    paths: examples.map((doc) => {
      return {
        params: {
          slug: doc.slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { meta, content } = getExampleBySlug(params.slug);
  const guides = getAllDocLinks();
  const examples = getAllExampleLinks();
  const html = await markdownToHtml(content || "");
  return {
    props: {
      html,
      guides,
      examples,
      meta,
    },
  };
}
