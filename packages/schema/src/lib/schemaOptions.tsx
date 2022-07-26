export const RHFSCustomSchemaOptions = {
  keywords: [
    {
      keyword: "component",
      type: "string",
    },
    {
      keyword: "isNotEmpty",
      validate: (schema: any, data: any) => {
        return typeof data === "string" && data.trim() !== "";
      },
      errors: false,
    },
    {
      keyword: "trueRequired",
      validate: (schema: any, data: any) => {
        return typeof data === "boolean" && data;
      },
      errors: false,
    },
  ],
};
