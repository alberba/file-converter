import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FormatSelector from "./FormatSelector";

describe("FormatSelector Component", () => {
  it("should render format options and handle selection change", () => {
    const mockSetSelectedFormat = vi.fn();
    render(
      <FormatSelector
        selectedFormat="png"
        setSelectedFormat={mockSetSelectedFormat}
      />,
    );

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("png");

    // Simular el cambio de selección
    selectElement.value = "jpeg";
    fireEvent.change(selectElement);
    expect(mockSetSelectedFormat).toHaveBeenCalledWith("jpeg");
  });
});
