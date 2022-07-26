import { JSONFormSchema } from "../types";
import { schemaToFields } from "./schemaToFields";
import $RefParser from "@apidevtools/json-schema-ref-parser";

const baseSchema: JSONFormSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  $defs: {
    test: {
      type: "object",
      properties: {
        nested: {
          type: "string",
        },
      },
    },
  },
};

const buildSchema = async (schemaParts: any = {}) => {
  return deref({ ...baseSchema, ...schemaParts });
};

const deref = async (schema: JSONFormSchema) => $RefParser.dereference(schema);
describe("schemaToFields", () => {
  it("Should return no fields for an empty schema", async () => {
    const s = await buildSchema();
    expect(schemaToFields(s)).toEqual({
      normalized: [],
    });
  });
  describe("Field names", () => {
    it("Should correctly set the field name for base fields", async () => {
      const s = await buildSchema({
        properties: {
          test: {
            type: "string",
            title: "Hello World",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("name", "test");
    });
    it("Should correctly set the field name for nested fields", async () => {
      const s = await buildSchema({
        properties: {
          foo: {
            type: "object",
            properties: {
              bar: {
                type: "string",
              },
              bing: {
                type: "object",
                properties: {
                  bijou: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("name", "foo.bar");
      expect(normalized[1]).toHaveProperty("name", "foo.bing.bijou");
    });

    it("Should correctly set the field name for array fields", async () => {
      const s = await buildSchema({
        properties: {
          foo: {
            type: "array",
            items: {
              $ref: "#/$defs/test",
            },
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0].items[0]).toHaveProperty("name", "nested");
    });

    it("Should correctly set the field name for basic array fields", async () => {
      const s = await buildSchema({
        properties: {
          foo: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0].items[0]).toHaveProperty("name", "");
      expect(normalized[0].items.length).toEqual(1);
    });
  });

  describe("Select rendering", () => {
    it("Should render a select box if you pass an enum to a string field", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            enum: ["Test", "Test 2"],
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "select");
      expect(normalized[0]).toHaveProperty("options", [
        { label: "Test", value: "Test" },
        { label: "Test 2", value: "Test 2" },
      ]);
    });
  });

  describe("Formatting", () => {
    it("Should set the component to date when the format is date", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            format: "date",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "date");
    });
    it("Should set the component to email when the format is email", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            format: "email",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "email");
    });
    it("Should set the component to email when the format is email", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            format: "password",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "password");
    });
    it("Setting the component in the schema should override a format defuault component set.", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            format: "password",
            component: "override-password",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "override-password");
    });
    it("should set the component to datetime for datetime formats", async () => {
      const s = await deref({
        ...baseSchema,
        properties: {
          foo: {
            type: "string",
            format: "date-time",
            component: "datetime",
          },
        },
      });
      const { normalized } = schemaToFields(s);
      expect(normalized[0]).toHaveProperty("component", "datetime");
    });
  });
});
