import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import type { Field } from "../types";
import RenderComponent from "../RenderComponent";
import { it, expect, describe, vi, beforeEach } from "vitest";

const props = {
  components: {},

  field: {
    type: "text",
    name: "firstName",
    label: "First Name",
  } as Field,
  register: vi.fn(),
};
describe("RenderComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render a default text input.", async () => {
    expect.assertions(2);
    render(<RenderComponent {...props} />);
    await waitFor(() => {
      expect(props.register).toHaveBeenCalledTimes(1);
      expect(screen.getByLabelText("First Name")).toHaveAttribute(
        "type",
        "text"
      );
    });
  });

  it("render the correct input based on the type field.", async () => {
    expect.assertions(1);
    props.field.type = "doesntmatch" as any;
    const warn = vi.spyOn(console, "warn").mockImplementationOnce(() => {});
    render(<RenderComponent {...props} />);
    await waitFor(() => {
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  it("should merge the default components lists with the passed in components to create a ", async () => {
    expect.assertions(2);
    const customComponents = {
      text: () => <div data-testid="my-test-id">Test</div>,
    };
    props.components = {
      ...customComponents,
    };
    props.field.type = "string" as any;
    render(<RenderComponent {...props} />);
    await waitFor(() => {
      expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
    });
    props.field.type = "doesntmatch" as any;
    const warn = vi.spyOn(console, "warn").mockImplementationOnce(() => {});
    render(<RenderComponent {...props} />);
    await waitFor(() => {
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });
});

export {};
