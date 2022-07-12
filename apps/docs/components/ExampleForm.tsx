import { FormSchema } from "react-hook-form-schema";

export default function MyForm() {
  return (
    <FormSchema
      name="my-form"
      schema={{
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          firstName: {
            type: "string",
            title: "First name",
          },
          lastName: {
            type: "string",
            title: "Last name",
          },
        },
        required: ["firstName", "lastName"],
      }}
      defaultValues={{ firstName: "", lastName: "" }}
      onSubmit={(values) => console.log(values)}
    />
  );
}
