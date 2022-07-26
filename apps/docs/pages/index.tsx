import {
  DesktopComputerIcon,
  DocumentReportIcon,
} from "@heroicons/react/solid";
import JsonSchemaLogo from "components/elements/JsonSchemaLogo";
import Layout from "components/Layout";
import { getAllDocLinks, getAllExampleLinks } from "lib/docs";
import Image from "next/image";
import Link from "next/link";

export default function Docs({ guides, examples }) {
  return (
    <Layout guides={guides} examples={examples}>
      <div className="md:flex w-full md:flex-col text-white">
        <div className="md:p-32 space-y-4 md:space-y-6">
          <h1 className=" text-center text-6xl font-black">
            React Hook Form Schema
          </h1>
          <h2 className="text-center text-xl md:text-4xl font-bold tracking-tighter">
            The{" "}
            <a
              href="https://react-hook-form.com/"
              className="text-slate-700 font-bold"
            >
              react hook form
            </a>{" "}
            you know and love
          </h2>
          <h3 className="flex items-center justify-center  text-xl font-bold">
            Powered by
            <a
              href="https://json-schema.org/"
              className="ml-2 text-slate-700 font-black mr-2"
            >
              JSON Schema
            </a>
            <JsonSchemaLogo />
          </h3>
          <div className="flex items-center justify-center md:p-8 space-x-4">
            <Link href="/examples/kitchen_sink">
              <a className="flex items-center bg-slate-900/40 font-medium uppercase tracking-wide px-6 py-5 rounded shadow-lg transition ease-in-out duration-75 hover:scale-105 hover:text-pink-500">
                <DesktopComputerIcon className="w-5 h-5 mr-1" />
                DEMO
              </a>
            </Link>

            <Link href="/getting-started">
              <a className="flex items-center bg-slate-900/40 font-medium uppercase tracking-wide px-6 py-5 rounded shadow-lg transition ease-in-out duration-75 hover:scale-105 hover:text-pink-500">
                <DocumentReportIcon className="w-5 h-5 mr-1" />
                Get Started
              </a>
            </Link>
          </div>
          <div className="relative h-[250px] md:h-[700px]">
            <Image
              src="/vscode_example.PNG"
              alt="Vscode Example"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="container mx-auto py-8">
            <pre className="bg-black/80 text-pink-400 rounded text-center font-bold p-4">
              <code>npm install react-hook-form-schema</code>
            </pre>
          </div>
          <div className="container mx-auto p-8 lg:p-32 bg-slate-900/60 rounded w-full">
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <div className="text-xl lg:text-6xl font-black my-4 md:my-0">
                  Who would
                  <br className="md:block hidden" /> use this?
                </div>
              </div>
              <div className="md:w-1/2 text-lg text-left font-semibold tracking-wider">
                <p className="mb-8">
                  Lets say you need to generate a lot of forms. Your building
                  something like a CMS or form heavy product and you have a lot
                  of forms. LIKE ALOT...
                </p>
                <p>
                  It would be nice if you could generate your forms from a
                  single source of truth on the data and validation side. While
                  still affording yourself enough flexibility on the frontend to
                  build interesting and unique forms across your application.
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto p-8 lg:p-32 bg-slate-900/60 rounded w-full">
            <div>
              <div className="text-xl text-center lg:text-6xl font-black my-4 md:my-0">
                Still in early development
                <br />
                <br />
                🚀 Stay Tuned 🚀
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const guides = getAllDocLinks();
  const examples = getAllExampleLinks();
  return {
    props: {
      guides,
      examples,
    },
  };
}
