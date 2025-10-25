export function fileToImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
}

export function drawCanvas(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  newWidth: number,
  newHeight: number,
) {
  canvas.width = newWidth;
  canvas.height = newHeight;
}

export function convertCanvasToBlob(
  canvas: HTMLCanvasElement,
  format: string,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else reject(new Error("Blob conversion failed"));
      },
      format,
      quality,
    );
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

export function removeExtFromFileName(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) return fileName;
  return fileName.slice(0, lastDotIndex);
}
