import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import RenderSchema from "./RenderSchema";
import RenderComponent from "./RenderComponent";
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
  const { handleSubmit, ...formProps } = useForm({
    resolver: validations ? yupResolver(validations) : undefined,
    defaultValues,
  });
  const formRef = useRef(null);

  return (
    <form
      data-testid={`test_${name}`}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
      className={className}
      name={name}
    >
      <RenderSchema
        RenderComponent={RenderComponent}
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
