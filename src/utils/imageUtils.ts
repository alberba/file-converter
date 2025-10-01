export function getFileInfo(file: File) {
  const name = file.name.split(".")[0];
  const extension = file.name.split(".").pop()?.toUpperCase() ?? "";
  return { name, extension };
}

export function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
}

export function createCanvasFromImage(newWidth: number, newHeight: number) {
  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext)
    throw new Error("No se pudo obtener el contexto del canvas");
  return { canvas, canvasContext };
}

export function loadImageAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject("No se pudo leer la imagen");
      }
    };
    reader.onerror = () => reject("Error al leer el archivo");
    reader.readAsDataURL(file);
  });
}

export function downloadImage(
  blob: Blob,
  fileName: string,
  selectedFormat: string,
) {
  const imageUrl = URL.createObjectURL(blob);
  const imageAnchor = document.createElement("a");
  imageAnchor.href = imageUrl;
  imageAnchor.download = `${fileName || "converted"}.${selectedFormat}`;
  imageAnchor.click();
  URL.revokeObjectURL(imageUrl);
}

export function formatBytes(
  bytes: number,
  decimals = 2,
): { value: number; unit: string } {
  if (bytes === 0) return { value: 0, unit: "Bytes" };

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i],
  };
}
