import {
  RenderOptions,
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { debug as previewDebug } from "jest-preview";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => {
  return render(ui, options);
};

export { fireEvent, previewDebug, customRender as render, waitFor };
