---json
{
  "title": "Kitchen Sink Example",
  "defaultValues": {
    "firstName": "",
    "lastName": "",
    "address": {
      "address1": "",
      "adddress2": "",
      "city": "",
      "state": "",
      "zipcode": ""
    },
    "requestType": {},
    "games": []
  },
  "uiSchema": {
    "rowMap": [
      [
        "firstName",
        "lastName",
        "age"
      ],
      [
        "address.address1",
        "address.address2"
      ],
      [
        "address.city",
        "address.state",
        "address.zipcode"
      ],
      [
        "requestType"
      ],
      ["requestType.name", "requestType.date"],
      ["requestType.bogart", "requestType.woomppo"],
      [
        "games"
      ],
      [
        "agreeTOS"
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
        "minLength": 1,
        "errorMessage": "Please enter your first name"
      },
      "lastName": {
        "type": "string",
        "title": "Last Name",
        "minLength": 1,
        "errorMessage": "Please enter your last name"
      },
      "age": {
        "type": "integer",
        "title": "Age",
        "errorMessage": "Please enter your age"
      },
      "requestType": {
        "title": "Request Type",
        "type": "object",
        "anyOf": [
          {
            "title": "WithDrawal",
            "properties": {
              "name": {
                "type": "string",
                "title": "Request Name (Ticket Number)"
              },
              "date": {
                "type": "string",
                "title": "Date of Request"
              }
            }
          },
          {
            "title": "WithDrawal 2",
            "type": "object",
            "properties": {
              "bogart": {
                "type": "string",
                "title": "Decision Level",
                "enum": ["Decision 1", "Decision 2", "Decision 3"]

              },
              "woomppo": {
                "type": "string",
                "title": "Toophy too"
              }
            }
          }
        ]
      },
      "address": {
        "type": "object",
        "title": "Address",
        "properties": {
          "address1": {
            "type": "string",
            "title": "Address One",
            "minLength": 1,
            "errorMessage": "Please add an address"
          },
          "address2": {
            "type": "string",
            "title": "Address Two (Optional)"
          },
          "city": {
            "type": "string",
            "title": "City",
            "minLength": 1,
            "errorMessage": "Please add a city"
          },
          "state": {
            "type": "string",
            "title": "State",
            "enum": ["MS", "FL", "AL", "LA"],
            "minLength": 2,
            "errorMessage": "Please enter a state"
          },
          "zipcode": {
            "type": "integer",
            "title": "Zip Code",
            "errorMessage": "Please enter your zip code"
          }
        },
        "required": [
          "address1",
          "city",
          "state",
          "zipcode"
        ]
      },
      "games": {
        "type": "array",
        "title": "Games",
        "items": { "$ref": "#/$defs/game" },
        "minItems": 1,
        "errorMessage": "Please add a game"
      },
      "agreeTOS": {
        "type": "boolean",
        "title": "I Agree to the terms and conditons and terms of service"
      }
    },
    "$defs": {
      "game": {
        "type": "object",
        "required": ["title", "year"],
        "properties": {
          "title": {
            "type": "string",
            "title": "Title",
            "minLength": 1,
            "errorMessage": "Please enter a game title"
          },
          "year": {
            "type": "integer",
            "title": "Release Year",
            "errorMessage": "Please enter a release year"
          }
        }
      }
    },
    "required": [
      "firstName",
      "lastName",
      "address",
      "age",
      "games",
      "agreeTOS"
    ]
  }
}
---

## Example Implementation

This example brings in array references, anyOf usage and conditional fields. lorem ipsum

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
