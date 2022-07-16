import React from "react";
import type { FieldComponentProps } from "react-hook-form-schema";
import styles from "./index.module.css";
import { Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

const Label = ({ id, children }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  );
};

const FieldGroup = ({ children }) => (
  <div className={styles.fieldGroup}>{children}</div>
);

export const ComponentDictionary = {
  string: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="text"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  integer: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  number: ({ label, register, name, id, title }: FieldComponentProps) => (
    <FieldGroup>
      <Label id={id}>{title}</Label>
      <input
        type="number"
        {...register(name)}
        id={id}
        className={styles.inputBase}
      />
    </FieldGroup>
  ),
  select: ({
    title,
    control,
    name,
    required,
    anyOf,
    id,
    ...rest
  }: FieldComponentProps) => {
    console.log(anyOf, rest);
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <div className="relative w-full">
            <Label id={id}>{title}</Label>
            <Listbox {...field} as="div">
              <Listbox.Button className={`${styles.select}`}>
                <span className="block truncate">{field.value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {anyOf?.map((option, id) => (
                    <Listbox.Option
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-pink-100 text-pink-900" : "text-gray-900"
                        }`
                      }
                      value={option?.enum?.[0]}
                      key={`${name}_${field.name}_option_${id}`}
                    >
                      {option.title}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        )}
      />
    );
  },
};
