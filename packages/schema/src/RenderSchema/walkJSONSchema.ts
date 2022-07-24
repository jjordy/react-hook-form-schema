import { AnyOfRecord, Field, JSONFormSchema } from "../types";
import { getVocabulary, schemaWalk } from "../util/schemaWalk";

export function walkJSONSchema(s: JSONFormSchema) {
  const vocab = getVocabulary(s);
  const normalized: Field[] = [];
  const anyOf: Record<string, AnyOfRecord[]> = {};
  const watchValues: string[] = [];

  schemaWalk(
    s,
    (
      schemaObj: any,
      pathFromParent: string[],
      parentSchemaObj: any,
      rootPath: any
    ) => {
      // break out the root path
      const [__, rootFieldName] = rootPath;
      // break out the parent path
      const [_, itemFieldName] = pathFromParent;
      // build out the field name string
      // take into account if our root field is
      // an array
      const fieldName = `${
        rootFieldName && isNaN(rootFieldName) ? rootFieldName + "." : ""
      }${itemFieldName}`;

      if (itemFieldName) {
        if (schemaObj.anyOf) {
          normalized.push({
            id: `id_${fieldName}`,
            name: fieldName,
            title: schemaObj.title,
            options: schemaObj.anyOf.map((i: any) => ({
              label: i.title,
              value: i.title,
            })),
            type: "select",
          });
          const allPropertiesForAnyOf = schemaObj.anyOf.map((i: any) =>
            Object.keys(i.properties)
          );
          schemaObj.anyOf.forEach((i: any) => {
            anyOf[i.title] = [].concat
              .apply([], allPropertiesForAnyOf)
              .map<AnyOfRecord>((property) => ({
                fieldName: `${fieldName}.${property}`,
                visible: i?.properties[property] ? true : false,
              }));
          });
          watchValues.push(fieldName);
        }
        // special handling of array type.
        if (schemaObj.type === "array") {
          const items = Object.keys(schemaObj?.items?.properties).map((key) => {
            return {
              name: key,
              id: `id_${key}`,
              ...schemaObj?.items?.properties?.[key],
            };
          });
          if (items && items.length > 0) {
            normalized.push({
              ...schemaObj,
              name: fieldName,
              items,
              type: "array",
            });
          }
        }
        // dont push anything if the parent is an array we took care of this above.
        if (parentSchemaObj.type !== "array" && !parentSchemaObj.anyOf) {
          switch (schemaObj.type) {
            case "string":
            case "integer":
            case "boolean":
              normalized.push({
                id: `id_${fieldName}`,
                ...schemaObj,
                name: fieldName,
                visible: rootPath?.includes("anyOf") ? false : true,
                options: getItemAnyOfMap(schemaObj),
                type: getItemTypeMap(schemaObj),
              });
          }
        }
      } else if (schemaObj.anyOf) {
        normalized.push({
          id: `id_root_anyof_select`,
          name: "root_anyof_select",
          title: schemaObj.title,
          options: schemaObj.anyOf.map((i: any) => ({
            label: i.title,
            value: i.title,
          })),
          type: "select",
        });
        const allPropertiesForAnyOf = schemaObj.anyOf.map((i: any) =>
          Object.keys(i.properties)
        );
        schemaObj.anyOf.forEach((i: any) => {
          anyOf[i.title] = [].concat
            .apply([], allPropertiesForAnyOf)
            .map<AnyOfRecord>((property) => ({
              fieldName: `${fieldName}.${property}`,
              visible: i?.properties[property] ? true : false,
            }));
        });
      }
    },
    null,
    vocab
  );
  return { normalized, anyOf, watchValues };
}

const getItemAnyOfMap = (schemaObj: Record<string, any>) => {
  if (schemaObj?.anyOf) {
    console.log(schemaObj.anyOf);
    return schemaObj?.anyOf?.map((option: any) => ({
      label: option?.title,
      value: option?.enum[0],
    }));
  }
  if (schemaObj?.enum) {
    return schemaObj?.enum?.map((option: any) => ({
      label: option,
      value: option,
    }));
  }
  return undefined;
};

const getItemTypeMap = (schemaObj: Record<string, any>) => {
  if (schemaObj?.anyOf || schemaObj?.enum) {
    return "select";
  }
  return schemaObj?.type;
};
