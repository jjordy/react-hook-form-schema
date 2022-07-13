# React Hook Form Schema

## Features & Vision

Welcome to react-hook-form-schema the [React Hook Form](https://react-hook-form.com/),
you know and love supercharged with [json-schema](https://json-schema.org/)
parsing, custom components and layouts. RHFS supports or will support **custom components**, **layouts**, **validation**, **remote submission** and more.

The main goal of RHFS is to provide a bridge between [json-schema](https://json-schema.org/) and [React Hook Form](https://react-hook-form.com/). RHFS provides a very minimal unstyled component set for testing but you the developer are expected to BYOC (Bring your own components), We provide a simple api for integrating your own [Component Dictionary](#component-dictionary)

## Getting Started

To get started install react-hook-form-schema using the package manager of your choice.

#### Npm Installation

```bash
npm install react-hook-form-schema
```

#### Yarn Installation

```bash
yarn install react-hook-form-schema
```

## Basic Example

```tsx
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
```

<h2 id="component-dictionary">Component Dictionary</h2>

```tsx
import { FormSchema } from "react-hook-form-schema";

const TextInput = ({ register, name, label, required = false }) => (
  <div>
    <label>{label}</label>
    <input {...register(name, { required })} />
  </div>
);

export default function MyForm() {
  return (
    <FormSchema
      name="my-form"
      schema={{
        ...schema,
      }}
      defaultValues={{ firstName: "", lastName: "" }}
      onSubmit={(values) => console.log(values)}
      components={{
        string: TextInput,
      }}
    />
  );
}
```
