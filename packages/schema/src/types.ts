import React from "react";
import * as Yup from "yup";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import { UseFormReturn } from "react-hook-form";

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type JSONFormSchema = {} & JSONSchema;

export type FieldComponentProps = {} & Field &
  Omit<UseFormReturn, "handleSubmit">;

export interface Field {
  type: KnownKeys<DefaultComponentDictionary>;
  name: string;
  label: string;
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

export interface FormSchemaProps {
  validations?: Yup.AnyObjectSchema;
  name: string;
  schema: JSONFormSchema;
  defaultValues: any;
  onSubmit: (values: any) => void;
  children?: (...props: any) => React.ReactNode;
  components?: Record<string, React.ElementType<any>>;
  className?: string;
}
