import type { FileData } from "@/types/types";
import type { ConversionOptions } from "@/types/types";

export const createMockFileData = (
  overrides: Partial<FileData> = {},
): FileData => {
  const mockImg = { src: "blob:mock" } as HTMLImageElement;
  mockImg.width = 800;
  mockImg.height = 600;

  return {
    name: "mockImage.png",
    img: mockImg,
    originalSize: 204800, // 200 KB
    ...overrides,
  };
};

export const createMockConversionOptions = (
  overrides: Partial<ConversionOptions> = {},
): ConversionOptions => {
  return {
    newWidth: 400,
    newHeight: 300,
    selectedFormat: "jpeg",
    quality: 0.8,
    ...overrides,
  };
};
