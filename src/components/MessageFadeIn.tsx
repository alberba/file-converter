import { useEffect, useState } from "react";

import crossSvg from "@/assets/cross.svg";

export default function MessageFadeIn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 4000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        clearTimeout(timer);
        setShow(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <span
      className={`fixed bottom-0 z-10 rounded-xl bg-black/50 px-2 py-1 font-semibold text-white transition-all duration-700 ${show ? "-translate-y-3 opacity-100" : "translate-y-12 opacity-0"}`}
    >
      <span className="hidden md:inline">
        Presiona o mantén el espacio para ver la imagen original
      </span>
      <span className="md:hidden flex items-center gap-2" onTouchStart={() => setShow(false)}>
        Presiona la imagen para ver los cambios
        <img src={crossSvg} alt="Boton para cerrar" className="h-4" />
      </span>
    </span>
  );
}
