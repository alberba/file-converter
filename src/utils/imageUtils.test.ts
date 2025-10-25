import { vi } from "vitest";
import {
  removeExtFromFileName,
  drawCanvas,
  resizeCanvas,
  convertCanvasToBlob,
  formatBytes,
} from "./imageUtils";

describe("removeExtFromFileName", () => {
  it("se elimina correctamente la extensión del archivo", () => {
    const fileName = "imagen.png";
    const result = removeExtFromFileName(fileName);
    expect(result).toBe("imagen");
  });
  it("se maneja correctamente un archivo sin extensión", () => {
    const fileName = "archivo_sin_extension";
    const result = removeExtFromFileName(fileName);
    expect(result).toBe("archivo_sin_extension");
  });
  it("se maneja correctamente un archivo con múltiples puntos", () => {
    const fileName = "mi.imagen.de.prueba.jpeg";
    const result = removeExtFromFileName(fileName);
    expect(result).toBe("mi.imagen.de.prueba");
  });
});

describe("drawCanvas", () => {
  it("llama a la función de dibujado con los valores correctos", () => {
    const mockCtx = {
      clearRect: vi.fn(),
      drawImage: vi.fn(),
    };
    const mockCanvas = {
      getContext: vi.fn(() => mockCtx),
      width: 200,
      height: 100,
    };

    const mockImg = {} as HTMLImageElement;

    drawCanvas(mockCanvas as unknown as HTMLCanvasElement, mockImg);

    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 200, 100);
    expect(mockCtx.drawImage).toHaveBeenCalledWith(mockImg, 0, 0, 200, 100);
  });
});

it("resizeCanvas ajusta el tamaño del canvas correctamente", () => {
  const mockCanvas = {
    width: 0,
    height: 0,
  };
  const newWidth = 300;
  const newHeight = 150;
  resizeCanvas(mockCanvas as unknown as HTMLCanvasElement, newWidth, newHeight);
  expect(mockCanvas.width).toBe(newWidth);
  expect(mockCanvas.height).toBe(newHeight);
});

describe("convertCanvasToBlob", () => {
  it("convierte el canvas a Blob correctamente", async () => {
    const blob = new Blob(["test"]);
    const mockCanvas = {
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(blob);
      },
    } as unknown as HTMLCanvasElement;

    await expect(convertCanvasToBlob(mockCanvas, "image/png", 1)).resolves.toBe(
      blob,
    );
  });

  it("maneja el error de conversión a Blob", async () => {
    const mockCanvas = {
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(null);
      },
    } as unknown as HTMLCanvasElement;
    await expect(
      convertCanvasToBlob(mockCanvas, "image/png", 1),
    ).rejects.toThrow("Blob conversion failed");
  });
});

it("formatBytes funciona correctamente", () => {
  expect(formatBytes(1024)).toStrictEqual({ value: 1, unit: "KB" });
  expect(formatBytes(1048576)).toStrictEqual({ value: 1, unit: "MB" });
  expect(formatBytes(0)).toStrictEqual({ value: 0, unit: "Bytes" });
});
