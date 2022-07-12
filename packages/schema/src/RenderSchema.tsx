import React, { useEffect, useState } from "react";
import { getVocabulary, schemaWalk } from "./util/schemaWalk";
import { UseFormReturn } from "react-hook-form";
import $RefParser from "@apidevtools/json-schema-ref-parser";

type RenderSchemaProps = {
  schema: any;
  components: Record<string, React.ElementType> | {};
  formProps: Omit<UseFormReturn, "handleSubmit">;
  RenderComponent: React.ElementType;
  defaultValues: any;
};

export default function RenderSchema({
  schema,
  components,
  formProps,
  RenderComponent,
  defaultValues,
}: RenderSchemaProps) {
  const [fields, setFields]: any[] = useState<any[]>([]);
  useEffect(() => {
    $RefParser
      .dereference(structuredClone(schema))
      .then((s) => {
        const normalized = handleWalkJSONSchema(s);
        setFields(normalized);
      })
      .catch((err) => {
        console.warn(`Error parsing schema: ${err.message}`);
      });
  }, [schema]);
  return (
    <>
      {fields &&
        fields.map((field: any, index: number) => (
          <RenderComponent
            components={components}
            field={field}
            name={field.name}
            {...formProps}
            key={`page_${index}_field_${index}`}
          />
        ))}
      <div className="flex items-center w-full justify-end">
        <button
          type="submit"
          className="bg-green-500 text-white font-medium py-2 px-3 rounded"
        >
          Submit Form
        </button>
      </div>
    </>
  );
}

function handleWalkJSONSchema(s: any) {
  const vocab = getVocabulary(s);
  const normalized: any[] = [];
  schemaWalk(
    s,
    (
      schemaObj: any,
      pathFromParent: string[],
      parentSchemaObj: any,
      rootPath: any
    ) => {
      const [__, rootFieldName] = rootPath;
      const [_, itemFieldName] = pathFromParent;
      const fieldName = `${
        rootFieldName ? rootFieldName + "." : ""
      }${itemFieldName}`;
      if (itemFieldName) {
        // special handling of array type.
        if (schemaObj.type === "array") {
          const items = Object.keys(schemaObj.properties).map((key) => {
            return { name: key, ...schemaObj.properties[key] };
          });
          normalized.push({ name: fieldName, items, type: "array" });
        }
        // dont push anything if the parent is an array we took care of this above.
        if (parentSchemaObj.type !== "array") {
          switch (schemaObj.type) {
            case "string":
            case "integer":
            case "boolean":
              normalized.push({ name: fieldName, ...schemaObj });
          }
        }
      }
    },
    null,
    vocab
  );
  return normalized;
}
