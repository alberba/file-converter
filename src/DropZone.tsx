import { useState } from "react";

export default function DropZone() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const dropHandle = (ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault();
    setFile(ev.dataTransfer.files[0]);

    if (file) {
      setFileName(file.name.split(".")[0] || null);
      setFileExtension(file.name.split(".").pop()?.toUpperCase() || null);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = async () => {
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": file!.type,
      },
      body: await file!.arrayBuffer(),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "converted"}.webp`;
    link.click();
    URL.revokeObjectURL(url);
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
        <button className="border" onClick={convertImage}>
          Convert Image
        </button>
      </aside>
    </section>
  );
}
