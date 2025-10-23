import type { FileData } from "@/types/types";

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
