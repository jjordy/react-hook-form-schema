import React from "react";
import ComponentDictionary, { ComponentTypeMap } from "./fields";
import { Field } from "./types";

interface RenderComponentProps {
  components: Record<string, React.ElementType<any>>;
  field: Field;
}

export default function RenderComponent({
  components,
  field: { type, component = null, ...fieldProps },
  ...rest
}: RenderComponentProps) {
  const allComponents: any = { ...ComponentDictionary, ...components };
  /**
   * If theres a component prop passed then we use that to override
   * We first search through the allComponents object to look for a match
   * if no match is found we look through the allComponents object mapped through the
   * Component type map which just maps a root type (e.g string, number, boolean) to a
   * Component
   */
  const Component = component
    ? (allComponents[component] ?? allComponents[component]) ||
      (allComponents[ComponentTypeMap[component]] ??
        allComponents[ComponentTypeMap[component]])
    : (allComponents[type] ?? allComponents[type]) ||
      (allComponents[ComponentTypeMap[type]] ??
        allComponents[ComponentTypeMap[type]]);

  if (!Component) {
    console.warn(
      `Component: ${
        component || type
      } was not found. Check the 'interface' key and make sure it matches something in your component dictionary.`
    );
    return null;
  }

  return <Component {...fieldProps} {...rest} components={allComponents} />;
}
