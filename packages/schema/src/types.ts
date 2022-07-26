import React from "react";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import { UseFormReturn } from "react-hook-form";

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type JSONFormSchema = {
  component?: string;
} & JSONSchema;

type UIControlsMain = {
  RowRenderer: React.ElementType<any>;
  AddRowButton: React.ElementType<any>;
  RemoveRowButton: React.ElementType<any>;
  SubmitButton: React.ElementType<any>;
  ArrayErrorMessage: React.ElementType<any>;
  ArrayTitle: React.ElementType<any>;
  RowContainer: React.ElementType<any>;
};

export type UIControls = Partial<UIControlsMain>;

export type UISchema = {
  rowMap?: string[][];
  controls: UIControls;
};

export type FieldComponentProps = {} & Field &
  Omit<UseFormReturn, "handleSubmit">;

export interface Field {
  type: KnownKeys<DefaultComponentDictionary>;
  name: string;
  label?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface DefaultComponentDictionary {
  text: React.ReactNode;
  select: React.ReactNode;
  number: React.ReactNode;
  date: React.ReactNode;
  password: React.ReactNode;
  array: React.ReactNode;
}

export interface FormContext {
  registerForm: (v: any) => any;
}

export type AnyOfRecord = {
  fieldName: string;
  visible: boolean;
};
