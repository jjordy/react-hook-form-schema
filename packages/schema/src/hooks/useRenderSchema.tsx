import React, { useCallback, useEffect, useMemo, useState } from "react";
import { schemaToFields } from "../lib/schemaToFields";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import produce from "immer";
import { Field, JSONFormSchema, AnyOfRecord } from "../types";
import { UseFormReturn } from "react-hook-form";

type UseRenderSchemaProps = {
  schema: JSONFormSchema;
  formProps: Omit<UseFormReturn, "handleSubmit">;
};

export default function useRenderSchema({
  schema,
  formProps,
}: UseRenderSchemaProps) {
  const [fields, setFields] = useState<Field[]>([]);
  // const [anyOf, setAnyOf] = useState<Record<string, AnyOfRecord[]>>({});
  // const [watchValues, setWatchValues] = useState<string[]>([]);

  const updateFields = useCallback(
    (field: Field[]) => {
      if (Array.isArray(field)) {
        const newFields = produce(fields, (draft) => {
          field.forEach((f) => {
            const indexOfCurrentField = fields.findIndex(
              (ft: any) => ft.name === f.name
            );
            if (indexOfCurrentField > -1) {
              draft.splice(indexOfCurrentField, 1, f);
            }
          });
        });
        setFields(newFields);
      }
    },
    [fields]
  );

  // useEffect(() => {
  //   const subscription = formProps.watch((value, { name }: any) => {
  //     if (watchValues.includes(name) && anyOf[value[name]]) {
  //       const conditionalFields = anyOf[value[name]];
  //       const fieldsToUpdate = conditionalFields
  //         .map(({ fieldName, visible }) => {
  //           const field = fields.find((f: any) => f.name === fieldName);
  //           if (field) {
  //             const newField: Field = { ...field, visible };
  //             return newField;
  //           }
  //           return null;
  //         })
  //         .filter((v) => {
  //           if (!v) {
  //             return false;
  //           }
  //           return true;
  //         });
  //       updateFields(fieldsToUpdate as Field[]);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [formProps, fields, updateFields]);

  useEffect(() => {
    $RefParser
      .dereference(structuredClone(schema))
      .then((s) => {
        try {
          const { normalized } = schemaToFields(s);
          setFields(normalized);
        } catch (err: any) {
          console.warn(`Error parsing schema`, err);
        }
      })
      .catch((err) => {
        console.warn(`Error parsing schema`, err);
      });
  }, [schema]);

  return {
    fields,
  };
}
