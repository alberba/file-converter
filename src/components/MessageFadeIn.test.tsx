import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import MessageFadeIn, { MESSAGE_DELAY } from "./MessageFadeIn";
import { act } from "react";

describe("MessageFadeIn Component", () => {
  it("should render without crashing", () => {
    render(<MessageFadeIn />);
  });

  it("Muestra el mensaje después del tiempo especificado", async () => {
    vi.useFakeTimers();
    render(<MessageFadeIn />);
    const message = screen.getByTestId("message-fade-in");

    expect(message).toHaveClass("opacity-0");

    act(() => {
      vi.advanceTimersByTime(MESSAGE_DELAY);
    });

    expect(message).toHaveClass("opacity-100");
  });

  describe("oculta el mensaje", () => {
    let message: HTMLElement;

    beforeEach(() => {
      vi.useFakeTimers();
      render(<MessageFadeIn />);
      message = screen.getByTestId("message-fade-in");
      act(() => {
        vi.advanceTimersByTime(MESSAGE_DELAY);
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("al presionar la barra espaciadora", async () => {
      fireEvent.keyDown(window, { code: "Space" });
      expect(message).toHaveClass("opacity-0");
    });

    it("al tocar en dispositivos móviles", async () => {
      fireEvent.touchStart(screen.getByTestId("message-fade-in-mobile"));
      expect(message).toHaveClass("opacity-0");
    });
  });
});
