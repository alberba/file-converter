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
  let input: HTMLInputElement;

  beforeEach(() => {
    render(<App />);
    input = screen.getByTestId("file-input") as HTMLInputElement;
  });

  it("muestra la LandingPage inicialmente", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  describe("cuando se sube una imagen", () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    
    it("procesa correctamente un archivo seleccionado via input", async () => {
      fireEvent.change(input, { target: { files: [file] } });
      const dropZone = screen.getByTestId("drop-zone");
      expect(dropZone).toBeInTheDocument();
    });

    it("procesa correctamente un archivo arrastrado", async () => {
      const dropArea = screen.getByTestId("landing-container");

      fireEvent.dragOver(dropArea);
      fireEvent.drop(dropArea, {
        dataTransfer: {
          files: [file],
        },
      });
      const dropZone = await screen.findByTestId("drop-zone");

      expect(dropZone).toBeInTheDocument();
    });
  });

  describe("cuando no se proporciona un archivo", () => {
    it("permanece en la LandingPage", async () => {
      fireEvent.change(input, { target: { files: [] } });
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
  });
});
