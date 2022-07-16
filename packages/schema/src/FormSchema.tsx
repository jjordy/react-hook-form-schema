import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "./FormContext";
import RenderSchema from "./RenderSchema";
import type { FormSchemaProps } from "./types";

export const FormSchema = ({
  validations,
  schema,
  className = "",
  defaultValues = {},
  name,
  onSubmit = (v) => console.log(v),
  components = {},
  children = () => <></>,
}: FormSchemaProps) => {
  const ctx = useContext(FormContext);
  const { handleSubmit, ...formProps } = useForm({
    resolver: validations ? yupResolver(validations) : undefined,
    defaultValues,
  });
  const formRef = useRef(null);
  useEffect(() => {
    if (ctx && formRef.current) {
      ctx.registerForm({ name, ref: formRef.current });
    }
  }, []);
  return (
    <form
      data-testid={`test_${name}`}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
      className={className}
      name={name}
    >
      <RenderSchema
        formProps={formProps}
        schema={schema}
        components={components}
        defaultValues={defaultValues}
      />
      {children({
        ...formProps,
      })}
    </form>
  );
};
