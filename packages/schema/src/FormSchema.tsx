import { ajvResolver } from "@hookform/resolvers/ajv";
import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "./FormContext";
import RenderSchema from "./RenderSchema";
import type { JSONFormSchema, UISchema } from "./types";

export interface FormSchemaProps {
  uiSchema?: UISchema;
  name: string;
  schema: JSONFormSchema;
  defaultValues: any;
  onSubmit: (values: any) => void;
  children?: (...props: any) => React.ReactNode;
  components?: Record<string, React.ElementType<any>>;
  className?: string;
  debug?: boolean;
}

export const FormSchema = ({
  schema,
  className = "",
  defaultValues = {},
  name,
  onSubmit = (v) => console.log(v),
  components = {},
  uiSchema,
  children = () => <></>,
}: FormSchemaProps) => {
  const ctx = useContext(FormContext);
  const { handleSubmit, ...formProps } = useForm({
    shouldFocusError: false,
    resolver: async (data, context, options) => {
      console.log("formData", data);
      console.log(
        "validation result",
        await ajvResolver(schema)(data, context, options)
      );
      return ajvResolver(schema)(data, context, options);
    },
    defaultValues,
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (ctx && formRef.current) {
      ctx.registerForm({ name, ref: formRef.current });
    }
  }, []);
  return (
    <form
      data-testid={`test_${name}`}
      onSubmit={handleSubmit(({ root_anyof_select = null, ...rest }) =>
        onSubmit({ ...rest })
      )}
      ref={formRef}
      className={className}
      // name={name}
    >
      <RenderSchema
        formProps={formProps}
        schema={schema}
        components={components}
        uiSchema={uiSchema}
        defaultValues={defaultValues}
      />
      {children({
        ...formProps,
      })}
    </form>
  );
};
