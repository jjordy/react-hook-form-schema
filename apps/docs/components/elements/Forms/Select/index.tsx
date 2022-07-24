import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import styles from "./index.module.css";

export default function Select({ field, options }) {
  /**
   * Create a backup label
   * We do this because its possible our field.value is a
   * complex object. So we need to keep track of our currently selected
   * label. This seems like a bit of a hack but this falls in line
   * with being able to name
   */
  const [backupLabel, setBackupLabel] = useState("");
  return (
    <div className="relative w-full">
      <Listbox
        {...field}
        as="div"
        onChange={(v) => {
          field.onChange(v);
          setBackupLabel(v);
        }}
      >
        <Listbox.Button className={`${styles.select}`}>
          <span className="block truncate">
            {typeof field.value === "string" ? field.value : backupLabel}
          </span>
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
          <Listbox.Options className={styles.optionsContainer}>
            {options?.map((option, id) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-pink-100 text-pink-900" : "text-gray-900"
                  }`
                }
                value={option.value}
                key={`${field.name}_option_${id}`}
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
