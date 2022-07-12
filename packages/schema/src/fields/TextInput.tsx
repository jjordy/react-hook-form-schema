import React from "react";

interface TextInputProps {
  label?: string;
  title?: string;
  register: any;
  name: string;
  type?: string;
}

export default function TextInput({
  label,
  register,
  name,
  type = "text",
  title,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={`id_${name}`}
        style={{
          display: "block",
          marginBottom: ".5rem",
          marginTop: ".2rem",
          fontWeight: "bold",
          color: "#787878",
        }}
      >
        {title || label || name}
      </label>
      <input
        type={type}
        {...register(name)}
        id={`id_${name}`}
        className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
}
