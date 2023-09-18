// Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Add a title prop
  children: ReactNode;
  footer?: ReactNode; // Optional footer content
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  const modalClasses = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed inset-0 overflow-y-auto ${modalClasses}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="relative bg-white rounded-lg shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-6 border-b border-gray-300">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold mb-4">{title}</h1>
              <button
                className="mb-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={onClose}
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="p-2 m-2">{children}</div>
          </div>
          {footer && (
            <div className="p-6 border-t border-gray-300">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
