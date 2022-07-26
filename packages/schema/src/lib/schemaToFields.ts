import { Field, JSONFormSchema } from "../types";
import { getVocabulary, schemaWalk } from "./schemaWalk";

export function schemaToFields(s: JSONFormSchema) {
  const vocab = getVocabulary(s);
  const normalized: Field[] = [];
  schemaWalk(
    s,
    (schemaObj, pathFromParent, parentSchemaObj, rootPath) => {
      const fieldName = getFieldName(rootPath, pathFromParent);
      if (fieldName) {
        // check if our item is an array type for special handling
        const item = buildArrayItem(schemaObj, fieldName);
        if (item) {
          normalized.push(item);
        }
        const rootItem = buildRootItem(schemaObj, fieldName, parentSchemaObj);
        if (rootItem) {
          normalized.push(rootItem);
        }
      }
    },
    null,
    vocab
  );
  return { normalized };
}

const buildArrayItem = (schemaObj: JSONFormSchema, fieldName: string) => {
  if (schemaObj.type === "array" && typeof schemaObj.items === "object") {
    const {
      type,
      properties = {},
      ...rest
    } = schemaObj?.items as JSONFormSchema;
    let items: any[] = [];
    switch (type) {
      case "string":
      case "boolean":
      case "integer":
      case "number":
        items = [{ id: `id_${fieldName}`, name: "", component: "string" }];
        break;
      case "object":
        items = Object.keys(properties).map((key) => {
          if (typeof properties?.[key]) {
            return buildItemProperties(
              key,
              properties?.[key] as JSONFormSchema
            );
          }
        });
        break;
      default:
    }
    if (items && items.length > 0) {
      const field: Field = {
        name: fieldName,
        items,
        type: "array",
        title: schemaObj?.title,
        description: schemaObj?.description,
      };
      return field;
    }
  }
  return null;
};

const buildRootItem = (
  schemaObj: JSONFormSchema,
  fieldName: string,
  parentSchemaObj?: JSONFormSchema
) => {
  // dont push anything if the parent is an array we took care of this above.
  if (parentSchemaObj?.type !== "array") {
    switch (schemaObj.type) {
      case "string":
      case "integer":
      case "number":
      case "boolean":
        return buildItemProperties(fieldName, schemaObj);
      default:
        return;
    }
  }
  return;
};

/**
 * get the fields name calculates this based on the parent and root path.
 */
const getFieldName = (rootPath: any[], pathFromParent: any[]) => {
  const [__, rootFieldName] = rootPath;
  const [_, itemFieldName] = pathFromParent;
  let fieldName = "";
  if (rootPath.length > 0) {
    fieldName = `${rootPath
      ?.filter((v: string) => v !== "properties")
      .join(".")}${itemFieldName ? `.${itemFieldName}` : ""}`;
  } else {
    fieldName = itemFieldName;
  }
  return fieldName;
};
/**
 * Build the item properties
 *
 */
const buildItemProperties = (
  fieldName: string,
  { component, type, format, title, description, ...rest }: JSONFormSchema
) => {
  const field: Partial<Field> = {
    title,
    description,
  };
  field.id = `id_${fieldName}`;
  field.name = fieldName;
  field.component = type;
  field.type = type as any;
  // we dont pull this out in the spread because
  // enum is a reserved word i guess
  if (rest.enum) {
    field.component = component || "select";
    field.options = rest.enum.map((option: any) => ({
      label: option,
      value: option,
    }));
  }
  if (format) {
    switch (format) {
      case "date":
        field.component = component || "date";
        break;
      case "email":
        field.component = component || "email";
        break;
      case "password":
        field.component = component || "password";
        break;
      case "date-time":
        field.component = component || "datetime";
    }
  }
  return field as Field;
};
