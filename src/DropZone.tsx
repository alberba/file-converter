import { useState } from "react";
import {
  loadImageAsDataURL,
  createCanvasFromImage,
  getFileInfo,
  fileToImage,
  downloadImage,
} from "./utils/imageUtils";

const formats = ["png", "jpg", "webp", "gif"];

export default function DropZone() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [selectedFormat, setSelectedFormat] = useState<string>("png");

  const handleDrop = async (dragEvent: React.DragEvent<HTMLElement>) => {
    dragEvent.preventDefault();
    const droppedFile = dragEvent.dataTransfer.files[0];
    if (!droppedFile) return;

    setFile(droppedFile);

    setImagePreview(await loadImageAsDataURL(droppedFile));
  };

  const convertToFormat = async () => {
    const image = await fileToImage(file as File);
    const { canvas, canvasContext } = createCanvasFromImage(image);
    canvasContext.drawImage(image, 0, 0);

    const convertedImageBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject("Error en conversión")),
        `image/${selectedFormat}`,
      ),
    );

    downloadImage(convertedImageBlob, getFileInfo(file!).name, selectedFormat);
  };

  return (
    <section className="flex gap-8">
      <main
        className="border p-10 max-w-2xl"
        onDrop={handleDrop}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" />
        ) : (
          "Drop files here"
        )}
      </main>
      {file && (
        <aside className="border p-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Convertir</h2>
          <div className="flex gap-2">
            {file && <p>De {getFileInfo(file!).extension} a</p>}
            <select
              className="border"
              name=""
              id=""
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {formats.map((format) => {
                return (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="border"
            onClick={convertToFormat}
            data-testid="convert-button"
          >
            Convert Image
          </button>
        </aside>
      )}
    </section>
  );
}
