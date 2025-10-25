import { createMockConversionOptions } from "@/testUtils/mocks";
import { act, fireEvent, render, screen } from "@testing-library/react";
import QualityInput from "./QualityInput";
import { vi } from "vitest";

describe("QualityInput Component", () => {
  const options = createMockConversionOptions();
  const onOptionsChange = vi.fn();
  let slider: HTMLInputElement;
  beforeEach(() => {
    render(
      <QualityInput options={options} onOptionsChange={onOptionsChange} />,
    );

    slider = screen.getByRole("slider") as HTMLInputElement;
  });

  it("should render without crashing", () => {
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("should update quality on slider change", () => {
    slider.value = "0.8";
    fireEvent.change(slider);

    expect(slider.value).toBe("0.8");
  });

  describe("should call onOptionsChange with correct quality value", () => {
    const NEW_QUALITY = 0.7;

    beforeEach(() => {
      vi.clearAllMocks();

      fireEvent.change(slider, { target: { value: NEW_QUALITY } });
    });

    it("on mouse up", () => {
      act(() => {
        fireEvent.mouseUp(slider);
      });

      expect(onOptionsChange).toHaveBeenCalledTimes(1);
      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        quality: 0.7,
      });
    });

    it("on touch end", () => {
      act(() => {
        fireEvent.touchEnd(slider);
      });
      expect(onOptionsChange).toHaveBeenCalledTimes(1);
      expect(onOptionsChange).toHaveBeenCalledWith({
        ...options,
        quality: 0.7,
      });
    });
  });
});
