import { removeExtFromFileName } from "./imageUtils";

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
