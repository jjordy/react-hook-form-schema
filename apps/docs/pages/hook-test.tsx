import Layout from "components/Layout";
import { Field, JSONFormSchema, useFormSchema } from "react-hook-form-schema";

const schema: JSONFormSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Username",
      isNotEmpty: true,
      errorMessage: "Please enter your username",
    },
    password: {
      type: "string",
      component: "password",
      title: "Password",
      minLength: 1,
      errorMessage: "Please enter your password",
    },
    agreeTOS: {
      type: "boolean",
      title: "I Agree to the terms and conditions",
      errorMessage: "Please agree to the terms and conditions",
      trueRequired: true,
    },
  },
  required: ["username", "password", "agreeTOS"],
};

export default function Docs({ guides, examples }) {
  const {
    fields,
    ref,
    formProps: { handleSubmit, register },
  } = useFormSchema({
    schema,
    debug: true,
    name: "test-form",
    defaultValues: {},
  });
  const renderComponent = (field: any) => {
    switch (field.type) {
      case "string":
        return (
          <input
            {...register(field.name)}
            id={field.id}
            className="w-full px-2 h-12 rounded shadow focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-indigo-300"
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            {...register(field.name)}
            id={field.id}
            className="p-4 rounded shadow"
          />
        );
    }
  };
  return (
    <Layout guides={guides} examples={examples}>
      <form
        onSubmit={handleSubmit((values) =>
          alert(JSON.stringify(values, null, 2))
        )}
        ref={ref}
      >
        {fields.map((field, fieldIdx) => (
          <div key={`hook_field_${fieldIdx}`}>
            <label className="my-2 block text-white" id={field.id}>
              {field.title}
            </label>

            {renderComponent(field)}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-sky-600 font-medium tracking-tighter uppercase text-white shadow rounded my-4"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
}
