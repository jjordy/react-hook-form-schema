import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as yup from "yup";
import { FormSchema } from "../FormSchema";
import { it, expect, describe } from "vitest";

const props = {
  schema: {
    fields: {
      firstName: {
        type: "text",
        label: "First Name",
      },
      label: {
        type: "text",
        label: "Last Name",
      },
    },
  },
  components: {},
  name: "my-test-form",
  onSubmit: () => {},
  defaultValues: {
    firstName: "",
    lastName: "",
  },
};
describe("Basic Form Schema", () => {
  it("should submit the form", async () => {
    render(<FormSchema {...props} />);
    fireEvent.submit(screen.getByTestId("test_my-test-form"));
    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("should not submit when there are form validation errors.", async () => {
    const validations = yup
      .object()
      .shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
      })
      .required();

    render(<FormSchema {...props} validations={validations} />);
    fireEvent.submit(screen.getByTestId("test_my-test-form"));
    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});

export {};
