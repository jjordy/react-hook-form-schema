import Layout from "components/Layout";
import { useRouter } from "next/router";
import { FormSchema, JSONFormSchema } from "react-hook-form-schema";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { ComponentDictionary } from "components/elements/Forms";
const JSONViewer = dynamic(() => import("react-json-view"), { ssr: false });

function exampleFetcher(url) {
  return fetch(url).then((res) => res.json());
}

export default function KitchenSinkExample() {
  const { query } = useRouter();

  const { data, error } = useSWR<JSONFormSchema>(
    query.slug ? `/api/examples/${query.slug}` : null,
    exampleFetcher
  );
  console.log("Schema Data", data);
  if (!data && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl my-4">Output</h2>
          <hr />
          <FormSchema
            className=""
            name="my-default-form"
            schema={data}
            components={ComponentDictionary}
            defaultValues={{
              firstName: "test",
              lastName: "test",
            }}
            onSubmit={(c) => alert(JSON.stringify(c, null, 2))}
          />
        </div>
        <div className="">
          <JSONViewer
            src={data}
            theme="ocean"
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </div>
      </div>
    </Layout>
  );
}
