import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { convertCanvasToBlob, fileToImage } from "@/utils/imageUtils";
import DropZone from "./DropZone";

vi.mock("@/utils/imageUtils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/utils/imageUtils")>();
  return {
    ...actual,
    fileToImage: vi.fn(),
    drawCanvas: vi.fn(),
    resizeCanvas: vi.fn(),
    convertCanvasToBlob: vi.fn(),
  };
});

describe("DropZone Component", () => {
  const mockBlobJpeg = new Blob(["mock"], { type: "image/jpeg" });
  const mockBlobPng = new Blob(["mock"], { type: "image/png" });
  const mockImg = { src: "blob:mock" } as HTMLImageElement;

  const mockedFileToImage = vi.mocked(fileToImage);
  const mockedConvertCanvasToBlob = vi.mocked(convertCanvasToBlob);

  const mockFileData = {
    name: "test-image",
    img: mockImg,
    originalSize: 1024,
  };

  const baseOptions = {
    newWidth: 100,
    newHeight: 100,
    quality: 0.8,
  };

  let revokeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockedConvertCanvasToBlob.mockReset();
    mockedFileToImage.mockReset();
    revokeSpy = vi.spyOn(URL, "revokeObjectURL");
  });

  afterEach(() => {
    revokeSpy.mockRestore();
  });

  it("creates canvas preview on blob change", async () => {
    mockedConvertCanvasToBlob.mockResolvedValueOnce(mockBlobJpeg);
    mockedFileToImage.mockResolvedValueOnce(mockImg);

    render(
      <DropZone
        file={mockFileData}
        originalFileURL="blob:original"
        handleDrop={vi.fn()}
        options={{ ...baseOptions, selectedFormat: "jpeg" }}
        onOptionsChange={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(mockedFileToImage).toHaveBeenCalledWith(mockBlobJpeg);
      expect(revokeSpy).toHaveBeenCalledWith(mockImg.src);
    });
  });

  it("does not create canvas preview if file.img is png", async () => {
    mockedConvertCanvasToBlob.mockResolvedValueOnce(mockBlobPng);
    mockedFileToImage.mockResolvedValueOnce(mockImg);

    render(
      <DropZone
        file={mockFileData}
        originalFileURL="blob:original"
        handleDrop={vi.fn()}
        options={{ ...baseOptions, selectedFormat: "png" }}
        onOptionsChange={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(mockedFileToImage).not.toHaveBeenCalled();
      expect(revokeSpy).not.toHaveBeenCalled();
    });
  });
});
