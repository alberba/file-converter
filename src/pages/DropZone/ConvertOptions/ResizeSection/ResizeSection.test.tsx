import { act, fireEvent, render, screen } from "@testing-library/react";
import ResizeSection from "./ResizeSection";
import {
  createMockConversionOptions,
  createMockFileData,
} from "@/testUtils/mocks";
import { vi } from "vitest";

describe("ResizeSection Component", () => {
  const options = createMockConversionOptions();
  const file = createMockFileData();
  const onOptionsChange = vi.fn();
  let widthInput: HTMLElement;
  let heightInput: HTMLElement;

  beforeEach(() => {
    render(
      <ResizeSection
        fileData={file}
        options={options}
        onOptionsChange={onOptionsChange}
      />,
    );
  });

  it("should render without crashing", () => {
    expect(
      screen.getByRole("spinbutton", { name: "Width" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Height" }),
    ).toBeInTheDocument();
  });

  describe("changes width and height correctly", () => {
    const NEW_WIDTH = 40;
    const NEW_HEIGHT = 30;

    let maintainRatioCheckbox: HTMLElement;

    beforeEach(() => {
      widthInput = screen.getByRole("spinbutton", { name: "Width" });
      heightInput = screen.getByRole("spinbutton", { name: "Height" });

      maintainRatioCheckbox = screen.getByRole("checkbox");

      expect(widthInput).toHaveValue(options.newWidth);
      expect(heightInput).toHaveValue(options.newHeight);
    });

    it("without maintain ratio", () => {
      act(() => {
        fireEvent.click(maintainRatioCheckbox);
      });

      expect(maintainRatioCheckbox).not.toBeChecked();

      fireEvent.change(widthInput, { target: { value: `${NEW_WIDTH}` } });

      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        newWidth: NEW_WIDTH,
        newHeight: options.newHeight,
      });

      fireEvent.change(heightInput, { target: { value: `${NEW_HEIGHT}` } });

      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        newWidth: options.newWidth,
        newHeight: NEW_HEIGHT,
      });
    });

    it("with maintain ratio", () => {
      expect(maintainRatioCheckbox).toBeChecked();

      const aspectRatio = options.newWidth / options.newHeight;

      fireEvent.change(widthInput, { target: { value: `${NEW_WIDTH}` } });
      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        newWidth: NEW_WIDTH,
        newHeight: Math.round(NEW_WIDTH / aspectRatio),
      });

      fireEvent.change(heightInput, { target: { value: `${NEW_HEIGHT}` } });
      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        newWidth: Math.round(NEW_HEIGHT * aspectRatio),
        newHeight: NEW_HEIGHT,
      });
    });
  });
});
