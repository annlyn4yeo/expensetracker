import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, children }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.9)]"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};
