import React from "react";
import type { FieldComponentProps, UIControls } from "react-hook-form-schema";
import styles from "./index.module.css";
import { PlusIcon, SaveAsIcon, XIcon } from "@heroicons/react/solid";

const Label = ({ id, children }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  );
};

const FieldGroup = ({ children, inline = false }) => (
  <div className={`${styles.fieldGroup} ${inline ? styles.inline : ""}`}>
    {children}
  </div>
);

export const ComponentDictionary = {
  string: ({ register, name, id, title, error }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="text"
        {...register(name)}
        id={id}
        className={`${styles.inputBase} ${error ? styles.error : ""}`}
      />
      <p>{error && error.message}</p>
    </FieldGroup>
  ),
  password: ({ register, name, id, title, error }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="password"
        {...register(name)}
        id={id}
        className={`${styles.inputBase} ${error ? styles.error : ""}`}
      />
      <p>{error && error.message}</p>
    </FieldGroup>
  ),
  integer: ({ register, name, id, title, error }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name, { valueAsNumber: true })}
        id={id}
        className={`${styles.inputBase} ${error ? styles.error : ""}`}
      />
      <p>{error && error.message}</p>
    </FieldGroup>
  ),
  number: ({ register, name, id, title, error }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name)}
        id={id}
        className={`${styles.inputBase} ${error ? styles.error : ""}`}
      />
      <p>{error && error.message}</p>
    </FieldGroup>
  ),
  date: ({ register, name, id, title, error }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="date"
        {...register(name)}
        id={id}
        className={`${styles.inputBase} ${error ? styles.error : ""}`}
      />
      <p>{error && error.message}</p>
    </FieldGroup>
  ),
  select: ({
    title,
    name,
    register,
    options,
    id,
    error,
  }: FieldComponentProps) => {
    return (
      <FieldGroup>
        <Label id={id}>{title}</Label>
        <select
          {...register(name)}
          id={id}
          className={`${styles.inputBase} ${error ? styles.error : ""}`}
        >
          <option>Select a value</option>
          {options?.map((option, idx) => (
            <option value={option?.value} key={`${name}_opt_${idx}`}>
              {option?.label}
            </option>
          ))}
        </select>
        <p>{error && error.message}</p>
      </FieldGroup>
    );
  },
  boolean: ({ title, name, register, id, error }) => {
    return (
      <FieldGroup inline>
        <input
          type="checkbox"
          className={styles.inputCheck}
          {...register(name)}
          id={id}
        />
        <Label id={id}>{title}</Label>
        {error && <p className="!ml-2">({error.message})</p>}
      </FieldGroup>
    );
  },
};

export const controls: UIControls = {
  RemoveRowButton: (props) => (
    <button
      className="p-1 ml-2 border-2 border-pink-500 text-pink-500 rounded-lg"
      {...props}
    >
      <XIcon className="w-5 h-5" />
    </button>
  ),
  AddRowButton: (props) => (
    <button
      type="button"
      className=" bg-sky-100 flex items-center text-sky-500 p-1 rounded"
      {...props}
    >
      <PlusIcon className="w-5 h-5" />
    </button>
  ),
  SubmitButton: (props) => (
    <button
      type="submit"
      className="flex items-center bg-green-100 text-green-500 px-3 py-2 mt-8 rounded font-medium w-full justify-center"
      {...props}
    >
      Save Form <SaveAsIcon className="h-4 w-4 ml-2" />
    </button>
  ),
  ArrayErrorMessage: ({ children }) => (
    <p className="text-pink-500 font-medium">{children}</p>
  ),
  ArrayTitle: ({ children }) => (
    <div className="text-3xl text-pink-500 font-thin mb-4">{children}</div>
  ),
  RowContainer: ({ children }) => (
    <div className="p-2 border-sky-300 rounded-xl border-2 mb-4 flex items-start">
      {children}
    </div>
  ),
};
