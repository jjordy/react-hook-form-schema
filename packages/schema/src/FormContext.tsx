import React, { useCallback, useState } from "react";
import { createContext } from "react";
import type { FormContext as TFormContext } from "./types";

export const FormContext = createContext<TFormContext>({
  registerForm: () => {},
});

interface FormSchemaProviderProps {
  children: React.ReactNode;
}

export function FormSchemaProvider({ children }: FormSchemaProviderProps) {
  const [forms, setForms] = useState<any>({});

  const registerForm = useCallback((v: any) => {
    setForms({ ...forms, v });
  }, []);
  return (
    <FormContext.Provider value={{ registerForm }}>
      {children}
    </FormContext.Provider>
  );
}
