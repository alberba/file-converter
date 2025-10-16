import { useEffect, useState } from "react";

type ImageContainerProps = {
  originalFileURL: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
};

export default function ImageContainer({
  originalFileURL,
  canvasRef,
}: ImageContainerProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const handlePressStart = () => setShowOriginal(true);
  const handlePressEnd = () => setShowOriginal(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setShowOriginal(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setShowOriginal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      tabIndex={0}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className="relative flex h-full w-full items-center"
    >
      <canvas ref={canvasRef} className="w-full" />
      {showOriginal && (
        <div>
          <span className="bg-accent absolute top-2 right-2 z-10 rounded-lg px-3 py-1 font-semibold text-white">
            Original Image
          </span>
          <img
            className="absolute top-0 right-0 w-full"
            src={originalFileURL}
          />
        </div>
      )}
    </div>
  );
}
