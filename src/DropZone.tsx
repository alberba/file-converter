import { useState } from "react";

export default function DropZone() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const dropHandle = (ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0];
    setFileName(file.name.split(".")[0] || null);
    setFileExtension(file.name.split(".").pop()?.toUpperCase() || null);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = `${fileName}.${fileExtension?.toLowerCase() || "png"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="flex gap-8">
      <main
        className="border p-10 max-w-2xl"
        onDrop={dropHandle}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      >
        {preview ? <img src={preview} alt="Preview" /> : "Drop files here"}
      </main>
      <aside className="border p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Convertir</h2>
        <div className="flex gap-2">
          {fileExtension && <p>De {fileExtension} a</p>}
          <select className="border" name="" id="">
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
            <option value="gif">GIF</option>
          </select>
        </div>
        <button className="border" onClick={downloadImage}>
          Download Image
        </button>
      </aside>
    </section>
  );
}
