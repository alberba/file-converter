import { fireEvent, render, screen } from "@testing-library/react";
import ImageContainer from "./ImageContainer";

describe("Image Container Component", () => {
  it("shows original image on spacebar press", async () => {
    const originalFileURL = "http://example.com/original.jpg";

    render(<ImageContainer originalFileURL={originalFileURL} />);
    expect(screen.queryByTestId("original-image")).toBeNull();

    fireEvent.keyDown(window, { code: "Space" });

    expect(screen.getByTestId("original-image")).toBeInTheDocument();
  });

  it("hides original image on spacebar release", async () => {
    const originalFileURL = "http://example.com/original.jpg";
    render(<ImageContainer originalFileURL={originalFileURL} />);

    fireEvent.keyDown(window, { code: "Space" });
    expect(screen.getByTestId("original-image")).toBeInTheDocument();

    fireEvent.keyUp(window, { code: "Space" });
    expect(screen.queryByTestId("original-image")).toBeNull();
  });
});
