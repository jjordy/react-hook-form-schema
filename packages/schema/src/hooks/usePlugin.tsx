import { useContext } from "react";
import { FormContext } from "../FormContext";
import type { FormContext as TFormContext, Plugin } from "../types";

export default function usePlugin(plugins: Plugin[] = []) {
  const context = useContext<TFormContext>(FormContext);
  // TODO make this work better than only loading the last plugin.
  // that doesnt make sense.
  //
  // Load the last plugin from the passed argument first or fallback to the context.
  const plugin = plugins.length
    ? plugins[plugins.length - 1]
    : context?.plugins[context.plugins.length - 1];
  const { RenderSchema, RenderComponent } = plugin();
  if (!RenderSchema) {
    console.warn(
      `Warning Schema Plugin Manager: RenderSchema not defined or not a function.`
    );
  }
  if (!RenderComponent) {
    console.warn(
      `Warning Schema Plugin Manager: RenderComponent must be defined and be a react component.`
    );
  }
  return {
    RenderSchema,
    RenderComponent,
  };
}
