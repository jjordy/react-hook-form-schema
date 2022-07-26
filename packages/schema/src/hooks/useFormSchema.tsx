import { JSONFormSchema } from "../types";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../Components/FormContext";
import { ajvResolver } from "../lib/ajvResolver";
import { RHFSCustomSchemaOptions } from "../lib/schemaOptions";
import useRenderSchema from "./useRenderSchema";

export type UseFormSchemaProps = {
  name: string;
  schema: JSONFormSchema;
  defaultValues: any;
  debug: boolean;
};

export function useFormSchema({
  name,
  schema,
  defaultValues,
  debug = false,
}: UseFormSchemaProps) {
  const ctx = useContext(FormContext);
  const formProps = useForm({
    shouldFocusError: false,
    resolver: async (data, context, options) => {
      if (debug) {
        console.log("RHFS: Data", data);
        console.log(
          "RHFS: Validation result",
          await ajvResolver(schema, RHFSCustomSchemaOptions)(
            data,
            context,
            options
          )
        );
      }
      return ajvResolver(schema, RHFSCustomSchemaOptions)(
        data,
        context,
        options
      );
    },
    defaultValues,
  });
  const { fields } = useRenderSchema({ schema, formProps });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (ctx && formRef.current) {
      ctx.registerForm({ name, ref: formRef.current });
    }
  }, []);
  return {
    ref: formRef,
    formProps,
    fields,
  };
}
