import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("Clicked outside modal, closing it");
        handler();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
