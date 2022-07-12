import React from "react";
import ComponentDictionary, { ComponentTypeMap } from "./fields";
import { Field } from "./types";

interface RenderComponentProps {
  components: Record<string, React.ReactNode>;
  field: Field;
}

export default function RenderComponent({
  components,
  field: { type, ...fieldProps },
  ...rest
}: RenderComponentProps) {
  const allComponents: any = { ...ComponentDictionary, ...components };
  const Component =
    (allComponents[type] ?? allComponents[type]) ||
    (allComponents[ComponentTypeMap[type]] ??
      allComponents[ComponentTypeMap[type]]);
  if (!Component) {
    console.warn(
      `Component: ${type} was not found. Check the 'interface' key and make sure it matches something in your component dictionary.`
    );
    return null;
  }

  return <Component {...fieldProps} {...rest} components={allComponents} />;
}
