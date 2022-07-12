import React from "react";
import { render, screen } from "@testing-library/react";
import RenderComponent from "../RenderComponent";
import RenderSchema from "../RenderSchema";
import { it, expect, describe } from "vitest";

const props = {
  schema: {
    type: "object",
    properties: {
      firstName: {
        type: "text",
        title: "First Name",
      },
      lastName: {
        type: "text",
        title: "Last Name",
      },
    },
  },
  defaultValues: { firstName: "", lastName: "" },
  components: {},
  layout: {},
  RenderComponent,
  formProps: {},
};
describe("schemaRenderer", () => {
  it("schema render the correct number of fields based on the default schema", async () => {
    render(<RenderSchema {...(props as any)} />);
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });
});

export {};
