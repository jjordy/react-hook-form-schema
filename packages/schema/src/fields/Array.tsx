import React from "react";
import { FieldValues, useFieldArray } from "react-hook-form";

function renderArrayItems({
  key,
  parentName,
  items,
  components,
  idx,
  ...rest
}: any) {
  return items.map(({ type, ...fieldProps }: any, index: number) => {
    const Component = components[type] ?? components[type];
    if (!Component) {
      console.warn(
        `Component: ${type} was not found. Check the 'interface' key 
         and make sure it matches something in your component dictionary.`
      );
      return null;
    }
    return (
      <Component
        {...rest}
        {...fieldProps}
        name={`${parentName}.${idx}.${fieldProps.name}`}
        components={components}
        key={`${key}_${index}`}
      />
    );
  });
}

export default function ArrayField({
  components,
  items,
  name,
  control,
  title,
  ...rest
}: any) {
  const { fields, remove, append } = useFieldArray<
    FieldValues,
    string,
    "__internal__form_array_id"
  >({
    control,
    keyName: "__internal__form_array_id",
    name,
    ...rest,
  });

  const addRowValues = items
    ?.map((item: { name: string }) => item.name)
    ?.reduce((acc: Record<string, string>, curr: string) => {
      acc[curr] = "";
      return acc;
    }, {});

  return (
    <div>
      <h3
        style={{
          fontSize: `1.5rem`,
          marginTop: ".5rem",
          marginBottom: ".5rem",
        }}
      >
        {title}
      </h3>
      <hr style={{ marginTop: ".5rem", marginBottom: ".5rem" }} />
      {fields?.map((field, index: number) => (
        <div className="flex items-end w-full">
          <div className="w-5/6">
            <div
              key={field.__internal__form_array_id}
              className={`grid grid-cols-2 gap-8`}
            >
              {renderArrayItems({
                ...rest,
                components,
                items,
                parentName: name,
                key: field.__internal__form_array_id,
                idx: index,
              })}
            </div>
          </div>
          <div className="w-1/6 flex justify-end items-center">
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 px-2 py-2 font-medium text-white uppercase rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append(addRowValues)}
        className="py-2 px-3 bg-gray-500 mt-4 text-white font-medium rounded"
      >
        Add Row
      </button>
    </div>
  );
}
