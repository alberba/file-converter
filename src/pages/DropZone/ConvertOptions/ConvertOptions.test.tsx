import { fireEvent, render, screen } from "@testing-library/react";
import ConvertOptions from "./ConvertOptions";
import {
  createMockConversionOptions,
  createMockFileData,
} from "@/testUtils/mocks";
import { vi } from "vitest";

describe("ConvertOptions Component", () => {
  it("should toggle options visibility when header is clicked", () => {
    const file = createMockFileData();
    const options = createMockConversionOptions();

    render(
      <ConvertOptions
        file={file}
        options={options}
        onOptionsChange={vi.fn()}
        convertedImageBlob={new Blob()}
      />,
    );

    const convertOptionsHeader = screen.getByTestId("convert-options-header");
    const convertOptionsContent = screen.getByTestId("convert-options-content");

    // El estado inicial es desplegado
    expect(convertOptionsContent).toHaveClass("opacity-100");

    fireEvent.click(convertOptionsHeader);

    expect(convertOptionsContent).toHaveClass("opacity-0");
  });
});
