---json
{
  "title": "Basic Example",
  "uiSchema": {
    "rowMap": [
      [
        "firstName"
      ],
      [
        "lastName"
      ],
      [
        "age"
      ]
    ]
  },
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First Name",
        "minLength": 1
      },
      "lastName": {
        "type": "string",
        "title": "Last Name",
        "minLength": 1
      },
      "age": {
        "type": "integer",
        "title": "Age"
      }
    },
    "required": [
      "firstName",
      "lastName",
      "age"
    ]
  }
}
---

## Example Implementation

Basic usage example!

## Table of Contents

## Controls For this example {#controls-for-this-example}

```tsx
const controls = {
  RemoveRowButton: (props) => (
    <button className="p-0.5 bg-pink-100 text-pink-500 rounded" {...props}>
      <TrashIcon className="w-5 h-5" />
    </button>
  ),
  AddRowButton: (props) => (
    <button
      type="button"
      className=" bg-sky-100 flex items-center text-sky-500 p-1 rounded"
      {...props}
    >
      <PlusIcon className="w-5 h-5" />
    </button>
  ),
  SubmitButton: (props) => (
    <button
      type="submit"
      className="flex items-center bg-green-100 text-green-500 px-3 py-2 mt-4 rounded font-medium w-full justify-center"
      {...props}
    >
      Save Form <SaveAsIcon className="h-4 w-4 ml-2" />
    </button>
  ),
};
```

## Components for this example {#components-for-this-example}

```tsx
import React from "react";
import type { FieldComponentProps } from "react-hook-form-schema";
import styles from "./index.module.css";
import { Controller } from "react-hook-form";
import Select from "./Select";

const Label = ({ id, children }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  );
};

const FieldGroup = ({ children }) => (
  <div className={styles.fieldGroup}>{children}</div>
);

export const ComponentDictionary = {
  string: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="text"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  integer: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  number: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  select: ({
    title,
    control,
    name,
    required,
    options,
    id,
    ...rest
  }: FieldComponentProps) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <FieldGroup>
            <Label id={id}>{title}</Label>
            <Select options={options} field={field} />
          </FieldGroup>
        )}
      />
    );
  },
};
```

## Form Schema Implementation {#form-schema-implementation}

```tsx
<FormSchema
  className=""
  name="my-default-form"
  schema={meta.schema}
  uiSchema={{
    ...meta.uiSchema,
    controls,
  }}
  components={ComponentDictionary}
  defaultValues={{}}
  onSubmit={(c) => alert(JSON.stringify(c, null, 2))}
/>
```
