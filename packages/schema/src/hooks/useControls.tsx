import React, { useState, useCallback } from "react";
import {
  DefaultAddRowButton,
  DefaultRemoveRowButton,
  DefaultRowRenderer,
  DefaultSubmitButton,
  DefaultArrayErrorMsg,
  DefaultArrayTitle,
  DefaultRowContainer,
} from "../RenderSchema/components";

export default function useControls({ uiSchema }: any) {
  const { controls = {} } = uiSchema;
  return {
    RowRenderer: DefaultRowRenderer,
    AddRowButton: DefaultAddRowButton,
    RemoveRowButton: DefaultRemoveRowButton,
    SubmitButton: DefaultSubmitButton,
    ArrayErrorMessage: DefaultArrayErrorMsg,
    ArrayTitle: DefaultArrayTitle,
    RowContainer: DefaultRowContainer,
    ...controls,
  };
}
