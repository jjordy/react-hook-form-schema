# Api

## Table Of Contents

## </> Form Schema {#form-schema}

This workhorse schema component

```tsx
<FormSchema
  name={undefined}
  schema={undefined}
  defaultValues={{}}
  onSubmit={undefined}
  components={{}}
  validations={undefined}
  className={""}
  children={() => <></>}
/>
```

### Form Schema Props {#form-schema-props}

| Name              | Type       | Description                                                                                                    |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| **name**          | string     | A friendly name you can use to look your from up if you need to remote submit                                  |
| **schema**        | JSONSchema | A valid JSON schema describing your form                                                                       |
| **defaultValues** | object     | Optionally pass some default values to your form schema                                                        |
| **onSubmit**      | object     | Your submit handler will be passed your form values                                                            |
| **components**    | object     | A key value of your components the key should be the name you want to match the `component` or `type` against. |
| **validations**   | object     | An optional yup schema to validate against your form schema                                                    |
| **className**     | object     | An optional class name to pass to the underlying form element                                                  |
| **children**      | function   | An optional escape hatch to render the parsed form schema yourself                                             |

## </> FormContext: {#form-context}

Wrap your app in the FormSchemaProvider component to allow remote submit and tracking forms outside of the context.

```tsx
export default function MyApp({ Component, pageProps }) {
  return (
    <FormSchemaProvider>
      <Head>
        <title>React Hook Form Schema</title>
      </Head>
      <Component {...pageProps} />
    </FormSchemaProvider>
  );
}
```

### Form Context Props {#form-context-props}

| Name     | Type   | Description                                                                   |
| -------- | ------ | ----------------------------------------------------------------------------- |
| **name** | string | A friendly name you can use to look your from up if you need to remote submit |
