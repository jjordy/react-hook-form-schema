import JsonSchemaLogo from "components/elements/JsonSchemaLogo";
import Layout from "components/Layout";
import Image from "next/image";

export default function Docs() {
  return (
    <Layout>
      <div className="flex w-full flex-col justify-center">
        <div className="text-center space-y-2 text-white">
          <h1 className="text-4xl font-medium">React Hook Form Schema</h1>
          <h2 className="text-2xl font-semibold">
            The{" "}
            <a
              href="https://react-hook-form.com/"
              className="text-indigo-500 font-bold"
            >
              react hook form
            </a>{" "}
            you know and love
          </h2>
          <h3 className="flex items-center justify-center  text-xl font-bold">
            Powered by
            <a
              href="https://json-schema.org/"
              className="ml-2 text-indigo-500 font-black mr-2"
            >
              JSON Schema
            </a>
            <JsonSchemaLogo />
          </h3>
          <div className="relative h-[600px]">
            <Image
              src="/vscode_example.PNG"
              alt="Vscode Example"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="space-y-16 p-4 flex justify-center w-full">
            <pre className="bg-black/80 text-pink-400 rounded max-w-4xl font-bold p-4 w-full">
              <code>npm install -g react-hook-form-schema</code>
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  );
}
