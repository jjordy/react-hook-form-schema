import React from "react";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import { UseFormReturn } from "react-hook-form";

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type JSONFormSchema = {} & JSONSchema;

export type UIControls = {
  RowRenderer: React.ReactNode;
  AddRowButton: React.ReactNode;
  RemoveRowButton: React.ReactNode;
  SubmitButton: React.ReactNode;
  ArrayErrorMessage: React.ReactNode;
  ArrayTitle: React.ReactNode;
  RowContainer: React.ReactNode;
};

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
