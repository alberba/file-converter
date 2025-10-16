import { useEffect, useState } from "react";

export default function MessageFadeIn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className={`fixed bottom-0 rounded-xl bg-black/50 px-2 py-1 font-semibold text-white transition-all duration-700 ${show ? "-translate-y-3 opacity-100" : "translate-y-12 opacity-0"}`}
    >
      Presiona o mantén el espacio para ver la imagen original
    </span>
  );
}
