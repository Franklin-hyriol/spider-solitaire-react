import React, { useEffect } from "react";

type PopupProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  closeOnOverlayClick?: boolean;
  className?: string;
};

const Popup: React.FC<PopupProps> = ({
  children,
  open,
  setOpen,
  closeOnOverlayClick = true,
  className = "",
}) => {
  // Fermer la popup
  const close = () => setOpen(false);

  // Bloque le scroll du body quand la popup est visible
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Ferme avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => {
          if (closeOnOverlayClick) close();
        }}
      />

      {/* Container centré du popup */}
      <div
        className={`relative z-10 max-w-full max-h-full overflow-auto rounded-2xl shadow-2xl p-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
