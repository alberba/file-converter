import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import * as imageUtils from "./utils/imageUtils";

vi.spyOn(imageUtils, "fileToImage").mockImplementation(async () => {
  const img = new Image();
  img.width = 1;
  img.height = 1;
  return img;
});

describe("App", () => {
  it("muestra la LandingPage inicialmente", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("Muestra el componente DropZone cuando lanzan una imagen", async () => {
    render(<App />);

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    const dropZone = await screen.findByTestId("drop-zone");

    expect(dropZone).toBeInTheDocument();
  });
});
