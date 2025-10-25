import { fireEvent, render, screen } from "@testing-library/react";
import ConvertOptions from "./ConvertOptions";
import {
  createMockConversionOptions,
  createMockFileData,
} from "@/testUtils/mocks";
import { vi } from "vitest";
import * as imageUtils from "@/utils/imageUtils";

describe("ConvertOptions Component", () => {
  const file = createMockFileData();
  const options = createMockConversionOptions();
  const onOptionsChange = vi.fn();
  const convertedImageBlob = new Blob(["mock image data"], {
    type: "image/png",
  });

  beforeEach(() => {
    render(
      <ConvertOptions
        file={file}
        options={options}
        onOptionsChange={onOptionsChange}
        convertedImageBlob={convertedImageBlob}
      />,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should toggle options visibility when header is clicked", () => {
    const convertOptionsHeader = screen.getByTestId("convert-options-header");
    const convertOptionsContent = screen.getByTestId("convert-options-content");

    // El estado inicial es desplegado
    expect(convertOptionsContent).toHaveClass("opacity-100");

    fireEvent.click(convertOptionsHeader);

    expect(convertOptionsContent).toHaveClass("opacity-0");
  });

  it("should call onOptionsChange when options are changed", () => {
    const formatSelector = screen.getByRole("combobox");
    fireEvent.change(formatSelector, { target: { value: "jpeg" } });

    expect(onOptionsChange).toHaveBeenCalledWith({
      ...options,
      selectedFormat: "jpeg",
    });
  });

  it("should call downloader function when download button is clicked", () => {
    const downloadImageSpy = vi.spyOn(imageUtils, "downloadImage");
    const downloadButton = screen.getByTestId("convert-button-badge");
    fireEvent.click(downloadButton);

    expect(downloadImageSpy).toHaveBeenCalled();
    downloadImageSpy.mockRestore();
  });
});
